import os
import sys
import json
import re
import time
import numpy as np
from PIL import Image
import easyocr
from pillow_heif import register_heif_opener
from multiprocessing import Process, Queue

register_heif_opener()

images_dir = r"d:\Interview-Prep\sql\images"
checkpoint_path = r"d:\Interview-Prep\sql\ocr_checkpoint.json"
output_path = r"d:\Interview-Prep\sql\raw_ocr.txt"

def run_ocr_worker(worker_id, image_list, out_queue):
    # Initialize EasyOCR reader for this process
    print(f"Worker {worker_id} initializing EasyOCR reader...", flush=True)
    try:
        reader = easyocr.Reader(['en'], gpu=False)
    except Exception as e:
        print(f"Worker {worker_id} failed to initialize Reader: {e}", flush=True)
        return
        
    print(f"Worker {worker_id} started. Images to process: {len(image_list)}", flush=True)
    
    for idx, f in enumerate(image_list):
        path = os.path.join(images_dir, f)
        print(f"Worker {worker_id} [{idx+1}/{len(image_list)}] Processing: {f}", flush=True)
        try:
            img = Image.open(path).convert('RGB')
            img_np = np.array(img)
            results = reader.readtext(img_np)
            extracted_text = "\n".join([res[1] for res in results])
            
            # Send result back to main process
            out_queue.put((f, extracted_text))
            print(f"Worker {worker_id} finished processing: {f}", flush=True)
            
        except Exception as e:
            print(f"Worker {worker_id} error on {f}: {e}", flush=True)
            # Put error marker in queue so the count remains correct
            out_queue.put((f, f"ERROR: {e}"))
            
    print(f"Worker {worker_id} complete!", flush=True)

def generate_raw_ocr(checkpoint):
    try:
        with open(output_path, 'w', encoding='utf-8') as out_f:
            for f in sorted(checkpoint.keys()):
                out_f.write(f"=== File: {f} ===\n")
                out_f.write(checkpoint[f])
                out_f.write("\n\n" + "="*50 + "\n\n")
        print("raw_ocr.txt generated successfully!", flush=True)
    except Exception as e:
        print(f"Error generating raw_ocr.txt: {e}", flush=True)

def main():
    # Load main checkpoint
    checkpoint = {}
    if os.path.exists(checkpoint_path):
        try:
            with open(checkpoint_path, 'r', encoding='utf-8') as f:
                checkpoint = json.load(f)
            print(f"Loaded checkpoint with {len(checkpoint)} already processed images.", flush=True)
        except Exception as e:
            print(f"Error loading checkpoint: {e}. Starting fresh.", flush=True)
            
    # Get all images
    image_keywords = ('jpg', 'jpeg', 'png', 'webp', 'heic')
    all_files = os.listdir(images_dir)
    image_files = [f for f in all_files if any(kw in f.lower() for kw in image_keywords)]
    
    # Filter out page_XX.webp
    filtered_images = [f for f in image_files if not re.match(r'^page_\d+\.webp$', f.lower())]
    filtered_images.sort()
    
    images_to_run = [f for f in filtered_images if f not in checkpoint]
    print(f"Total images found in directory: {len(image_files)}", flush=True)
    print(f"Images to process: {len(filtered_images)}", flush=True)
    print(f"Remaining images to process: {len(images_to_run)}", flush=True)
    
    if not images_to_run:
        print("All images are already processed! Generating final raw_ocr.txt...", flush=True)
        generate_raw_ocr(checkpoint)
        return

    # Run 2 parallel workers
    num_workers = 2
    chunks = [images_to_run[i::num_workers] for i in range(num_workers)]
    
    out_queue = Queue()
    processes = []
    
    for i in range(num_workers):
        p = Process(target=run_ocr_worker, args=(i+1, chunks[i], out_queue))
        processes.append(p)
        p.start()
        
    processed_count = 0
    total_to_process = len(images_to_run)
    
    while processed_count < total_to_process:
        # Check if any process is alive
        alive = any(p.is_alive() for p in processes)
        
        while not out_queue.empty():
            img_name, text = out_queue.get()
            checkpoint[img_name] = text
            processed_count += 1
            print(f"Main thread: Progress {processed_count}/{total_to_process} - Saved {img_name}", flush=True)
            
            # Save checkpoint to disk
            with open(checkpoint_path, 'w', encoding='utf-8') as cp_f:
                json.dump(checkpoint, cp_f, ensure_ascii=False, indent=2)
                
        if not alive and out_queue.empty():
            break
            
        time.sleep(0.5)
            
    for p in processes:
        p.join()
        
    generate_raw_ocr(checkpoint)
    print("Batch OCR process complete!", flush=True)

if __name__ == "__main__":
    main()
