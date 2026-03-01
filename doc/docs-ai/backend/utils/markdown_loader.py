import os

def load_docs(folder):

    documents = []

    for root, dirs, files in os.walk(folder):

        for file in files:

            if file.endswith(".md"):

                path = os.path.join(root,file)

                with open(path,"r",encoding="utf-8") as f:

                    text = f.read()

                    documents.append({
                        "content":text,
                        "source":file
                    })

    return documents
