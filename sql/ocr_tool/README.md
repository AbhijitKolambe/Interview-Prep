# OCR & Markdown Consolidation Tool

This toolkit allows you to run parallel OCR extraction on handwritten/visual notes and automatically merge them with theoretical markdown guides.

## Directory Structure

To run this tool, organize your files as follows:
```text
ocr_tool/
├── run_batch_ocr.py        # OCR extractor
├── consolidate_guides.py   # Markdown parser and consolidator
└── README.md               # This guide
```

## How to Run for New Images/Notes

### Step 1: Place Your Source Files
1. Create an `images` folder (e.g., `sql/images/`) and place the images you want to transcribe inside it.
2. Place your starting theoretical study guides (e.g., `SQL-Basics.md` and `SQL-Visual-Notes.md`) in the parent directory.

### Step 2: Run the OCR Extractor
Run the parallel OCR script to transcribe all images. It will automatically save progress in `ocr_checkpoint.json` and generate `raw_ocr.txt`.
```powershell
python -u -X utf8 ocr_tool/run_batch_ocr.py
```
*Note: You can stop and resume this script at any time. It will not process already completed images.*

### Step 3: Run the Consolidator
Run the consolidation script to group all Q&As into 16 thematic chapters, deduplicate similar topics using keyword checking and Jaccard similarity, and output the single unified master guide.
```powershell
python -X utf8 ocr_tool/consolidate_guides.py
```

### Step 4: Verify and Clean Up
Open the newly generated Master Guide in your editor to verify it, then archive or delete the redundant/original source files and images.

---
Created by Antigravity AI pair-programmer.
