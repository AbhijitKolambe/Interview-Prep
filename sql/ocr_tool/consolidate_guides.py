import os
import sys
import re
import json

basics_path = r"d:\Interview-Prep\sql\SQL-Basics.md"
visual_notes_path = r"d:\Interview-Prep\sql\SQL-Visual-Notes.md"
checkpoint_path = r"d:\Interview-Prep\sql\ocr_checkpoint.json"

print("Starting consolidation process...")

# 1. Define Chapter Structure and Keywords
chapters = [
    {
        "id": 1,
        "title": "Database Basics & SQL vs NoSQL",
        "keywords": ["nosql", "rdbms", "dbms", "difference between dbms", "what is sql", "what is dbms", "row store", "column store", "relational database"]
    },
    {
        "id": 2,
        "title": "SQL Command Types & Execution Order",
        "keywords": ["ddl", "dml", "dcl", "tcl", "dql", "types of sql commands", "execution order", "data definition", "data manipulation", "auto-commit"]
    },
    {
        "id": 3,
        "title": "Basic Querying, Filtering, Sorting & Operators",
        "keywords": ["select data", "filtering", "sorting", "where clause", "order by", "like", "wildcard", "case sensitivity", "in and between", "comparison operators", "between and"]
    },
    {
        "id": 4,
        "title": "SQL Joins (Types & Scenarios)",
        "keywords": ["join", "inner join", "left join", "right join", "full join", "cross join", "self join", "outer join"]
    },
    {
        "id": 5,
        "title": "Aggregate Functions & Grouping",
        "keywords": ["aggregate function", "group by", "having clause", "where and having", "count(", "sum(", "avg(", "min(", "max(", "total sales"]
    },
    {
        "id": 6,
        "title": "Subqueries & Common Table Expressions (CTEs)",
        "keywords": ["subquery", "cte", "common table expression", "correlated", "exists", "recursive cte"]
    },
    {
        "id": 7,
        "title": "Data Types & NULL Value Handling",
        "keywords": ["data type", "varchar", "char", "int and float", "date data", "null vs 0", "null value", "coalesce", "nvl", "isnull", "ifnull", "phone number", "blank space", "char length"]
    },
    {
        "id": 8,
        "title": "Database Keys",
        "keywords": ["primary key", "unique key", "candidate key", "alternate key", "surrogate key", "natural key", "composite key"]
    },
    {
        "id": 9,
        "title": "Data Integrity, Constraints & Normalization",
        "keywords": ["constraint", "default value", "check constraint", "data integrity", "referential integrity", "normalization", "denormalization", "redundancy"]
    },
    {
        "id": 10,
        "title": "Transactions & ACID Properties",
        "keywords": ["transaction", "acid", "commit", "rollback", "savepoint"]
    },
    {
        "id": 11,
        "title": "Views & Indexing",
        "keywords": ["schema", "metadata", "view", "materialized view", "index", "indexing", "clustered"]
    },
    {
        "id": 12,
        "title": "Oracle-Specific Functions & PL/SQL Basics",
        "keywords": ["dual table", "rownum", "row_number", "pl/sql"]
    },
    {
        "id": 13,
        "title": "Cursors, Triggers & Mutating Table Error",
        "keywords": ["cursor", "trigger", "mutating table", "ora-04091"]
    },
    {
        "id": 14,
        "title": "Query Optimization & Performance Tuning",
        "keywords": ["optimize", "slow", "tuning", "execution plan"]
    },
    {
        "id": 15,
        "title": "Advanced Database Concepts",
        "keywords": ["partitioning", "isolation level", "dirty read", "phantom read", "repeatable read"]
    },
    {
        "id": 16,
        "title": "Practical Query Scenarios & Tricky Interview Q&A",
        "keywords": ["create a table", "insert data", "delete vs truncate", "nth highest", "n-th highest", "remove duplicate", "find duplicate", "union and union all", "window function", "sql injection"]
    }
]

# Helper to clean titles and extract words for deduplication
def get_clean_words(text):
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())
    words = set(text.split())
    stop_words = {'what', 'is', 'the', 'and', 'a', 'of', 'in', 'to', 'how', 'does', 'it', 'differ', 'from', 'explain', 'between', 'with', 'difference', 'types', 'who', 'which', 'would', 'you'}
    return words - stop_words

# Simple similarity check
def is_duplicate(sec1, sec2):
    title1 = sec1['title']
    title2 = sec2['title']
    
    # Exact or near-exact string match
    t1_clean = re.sub(r'\s+', ' ', re.sub(r'[^a-zA-Z0-9\s]', '', title1.lower())).strip()
    t2_clean = re.sub(r'\s+', ' ', re.sub(r'[^a-zA-Z0-9\s]', '', title2.lower())).strip()
    if t1_clean == t2_clean or t1_clean in t2_clean or t2_clean in t1_clean:
        return True

    w1 = get_clean_words(title1)
    w2 = get_clean_words(title2)
    if not w1 or not w2:
        return False
        
    intersection = w1.intersection(w2)
    union = w1.union(w2)
    jaccard = len(intersection) / len(union)
    
    if jaccard > 0.45:
        return True
        
    # Check specific keyword sets
    special_topics = [
        {"delete", "truncate", "drop"},
        {"primary", "unique"},
        {"union", "union all"},
        {"acid", "properties"},
        {"index", "indexing"},
        {"view", "materialized"},
        {"dbms", "rdbms"},
        {"rownum", "row_number"},
        {"varchar", "varchar2"},
        {"nth", "highest", "salary"},
        {"duplicate", "remove", "rows"}
    ]
    for topic in special_topics:
        if topic.issubset(w1) and topic.issubset(w2):
            return True
            
    return False

# Function to assign a section to a chapter
def assign_chapter(section):
    title_lower = section['title'].lower()
    body_lower = section['body'].lower()
    
    scores = [0] * len(chapters)
    for idx, ch in enumerate(chapters):
        for kw in ch['keywords']:
            # Triple weight for title match
            if kw in title_lower:
                scores[idx] += 4
            # Single weight for body match
            if kw in body_lower:
                scores[idx] += 1
                
    max_score = max(scores)
    if max_score > 0:
        return chapters[scores.index(max_score)]['id']
    else:
        # Default fallback to Chapter 16 for miscellaneous
        return 16

# 2. Parsers for MD files
def parse_basics_md(content):
    # Splits by "## " which marks questions in SQL-Basics.md
    sections = []
    # Strip Table of Contents at the beginning
    body_part = content.split("## 1. What is SQL")[1]
    body_part = "1. What is SQL" + body_part
    
    parts = body_part.split("\n## ")
    for idx, part in enumerate(parts):
        if not part.strip():
            continue
        lines = part.split("\n")
        title = lines[0].strip()
        # Remove leading number like "1. " or "2. "
        title_cleaned = re.sub(r'^\d+\.\s*', '', title)
        # Remove Oracle reference in title
        title_cleaned = re.sub(r'\s+in\s+Oracle$', '', title_cleaned, flags=re.IGNORECASE)
        
        body = "\n".join(lines[1:]).strip()
        sections.append({
            'source': 'Basics.md',
            'title': title_cleaned,
            'body': body
        })
    return sections

def parse_visual_notes_md(content):
    sections = []
    # Split by "### " which marks sub-questions/scenarios in SQL-Visual-Notes.md
    # Let's clean up and find all headings of level 3 and 4
    lines = content.split("\n")
    current_title = None
    current_body = []
    
    for line in lines:
        match = re.match(r'^(###|####)\s+(.*)$', line)
        if match:
            if current_title:
                sections.append({
                    'source': 'Visual-Notes.md',
                    'title': current_title,
                    'body': '\n'.join(current_body).strip()
                })
            # Clean title
            t = match.group(2).strip()
            # Remove things like "Q1.", "Q2.", or numbers at the beginning
            t_cleaned = re.sub(r'^(Q\d+\.|Q\d+:|\d+\.)\s*', '', t).strip()
            current_title = t_cleaned
            current_body = []
        else:
            if current_title:
                current_body.append(line)
                
    if current_title:
        sections.append({
            'source': 'Visual-Notes.md',
            'title': current_title,
            'body': '\n'.join(current_body).strip()
        })
        
    return sections

# 3. Parser for OCR text
def clean_ocr_text(text):
    # OCR output is line by line, sometimes split awkwardly. Let's merge adjacent lines that are not headers.
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    if not lines:
        return []
    
    ocr_items = []
    current_question = None
    current_lines = []
    
    for line in lines:
        # Check if the line looks like a question or header
        # E.g. starts with digits, starts with Q, contains a question mark, etc.
        is_q = False
        if re.match(r'^(Q\d+|\d+|Ans|SELECT|FROM|WHERE|GROUP|HAVING|INNER|LEFT|RIGHT|JOIN|CREATE|INSERT|UPDATE|DELETE|TRUNCATE|DROP|ALTER)', line, re.IGNORECASE):
            is_q = True
        
        if '?' in line:
            is_q = True
            
        if is_q and not line.upper().startswith(('ANS', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'HAVING', 'JOIN', 'ON', 'CREATE', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'DROP', 'ALTER')):
            # It's a new question!
            if current_question:
                ocr_items.append({
                    'source': 'OCR',
                    'title': current_question,
                    'body': ' '.join(current_lines).strip()
                })
            current_question = line
            current_lines = []
        else:
            if current_question:
                current_lines.append(line)
            else:
                # If no question header yet, treat first lines as title
                current_question = line
                
    if current_question:
        ocr_items.append({
            'source': 'OCR',
            'title': current_question,
            'body': ' '.join(current_lines).strip()
        })
        
    # Clean up and filter items
    valid_items = []
    for item in ocr_items:
        title = item['title'].strip()
        body = item['body'].strip()
        
        # Skip if title is too short or is just digits/numbers/junk
        if len(title) < 5 or title.isdigit() or re.match(r'^[\d_\-\s]+$', title):
            continue
            
        # Remove leading numbers, underscores, and dashes from title (e.g. "6_" or "10 - ")
        title = re.sub(r'^[\d_\-\s\(\)\#\.\:\,\?\!]+', '', title).strip()
        
        # Skip if title is now too short or empty
        if len(title) < 5:
            continue
            
        # Capitalize first letter if it is alphabetical
        if title and title[0].isalpha():
            title = title[0].upper() + title[1:]
            
        # Try to locate SELECT/CREATE/INSERT/UPDATE queries in body and wrap them in markdown blocks if not already formatted
        if "```sql" not in body.lower():
            # Format queries that end with a semicolon
            queries = re.findall(r'([A-Z]+\s+.*?;)', body, re.IGNORECASE)
            for q in queries:
                if any(kw in q.upper() for kw in ('SELECT', 'CREATE', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'DROP', 'ALTER')):
                    body = body.replace(q, f"\n```sql\n{q}\n```\n")
            
        item['title'] = title
        item['body'] = body.strip()
        valid_items.append(item)
        
    return valid_items

# Main logic
try:
    clean_visual_path = r"d:\Interview-Prep\sql\SQL-Visual-Notes-Clean.md"
    bak_path = r"d:\Interview-Prep\sql\SQL-Visual-Notes.md.bak"
    
    with open(basics_path, 'r', encoding='utf-8') as f:
        basics_content = f.read()
    basics_sections = parse_basics_md(basics_content)
    print(f"Parsed {len(basics_sections)} items from SQL-Basics.md")
    
    # Read clean visual notes
    visual_sections = []
    if os.path.exists(clean_visual_path):
        with open(clean_visual_path, 'r', encoding='utf-8') as f:
            clean_visual_content = f.read()
        visual_sections = parse_visual_notes_md(clean_visual_content)
        print(f"Parsed {len(visual_sections)} items from SQL-Visual-Notes-Clean.md")
    elif os.path.exists(visual_notes_path):
        with open(visual_notes_path, 'r', encoding='utf-8') as f:
            visual_content = f.read()
        visual_sections = parse_visual_notes_md(visual_content)
        print(f"Parsed {len(visual_sections)} items from SQL-Visual-Notes.md")
        
    # Read visual notes backup (.bak) if it exists
    bak_sections = []
    if os.path.exists(bak_path):
        with open(bak_path, 'r', encoding='utf-8') as f:
            bak_content = f.read()
        bak_sections = parse_visual_notes_md(bak_content)
        print(f"Parsed {len(bak_sections)} items from SQL-Visual-Notes.md.bak")
        
    ocr_sections = []
    if os.path.exists(checkpoint_path):
        with open(checkpoint_path, 'r', encoding='utf-8') as f:
            checkpoint = json.load(f)
        for img_name, ocr_text in checkpoint.items():
            ocr_sections.extend(clean_ocr_text(ocr_text))
        print(f"Parsed {len(ocr_sections)} items from OCR checkpoints.")
    else:
        print("No OCR checkpoint found yet.")
        
    # Merge lists
    all_sections = basics_sections + visual_sections + ocr_sections
    print(f"Total raw items gathered: {len(all_sections)}")
    
    # 4. Categorize by Chapter
    chapter_buckets = {ch['id']: [] for ch in chapters}
    for sec in all_sections:
        ch_id = assign_chapter(sec)
        chapter_buckets[ch_id].append(sec)
        
    # 5. Deduplicate within Chapters
    final_chapters = {}
    for ch_id, secs in chapter_buckets.items():
        deduped = []
        for s in secs:
            # Check if this item is duplicate of any already in deduped
            found = False
            for existing in deduped:
                if is_duplicate(s, existing):
                    # Merge content
                    found = True
                    # Keep the more descriptive title
                    if len(s['title']) > len(existing['title']):
                        existing['title'] = s['title']
                    
                    # Combine bodies if they are distinct and add context
                    s_body_clean = s['body'].strip()
                    existing_body_clean = existing['body'].strip()
                    
                    if s_body_clean and s_body_clean not in existing_body_clean:
                        if existing_body_clean:
                            # Format as a beautiful blockquote alert
                            formatted_note = f"\n\n> [!NOTE]\n> **Scenario / Additional Context (from {s['source']}):**\n"
                            indented_body = "\n".join([f"> {line}" if line.strip() else ">" for line in s_body_clean.split("\n")])
                            existing['body'] = f"{existing_body_clean}{formatted_note}{indented_body}"
                        else:
                            existing['body'] = s_body_clean
                    break
            if not found:
                # Add source tag if needed
                deduped.append(s)
        final_chapters[ch_id] = deduped
        
    # 6. Generate final markdown
    output = []
    output.append("# SQL Master Guide - Complete Interview Questions & Scenarios\n")
    output.append("This is a unified study guide combining theoretical concepts, visual scenario sheets, and cheatsheets to cover SQL, RDBMS design, practical queries, and performance tuning.\n")
    
    output.append("## Table of Contents")
    for ch in chapters:
        ch_slug = ch['title'].lower().replace(" & ", "-").replace(" (", "-").replace(")", "").replace(" ", "-").replace(",", "")
        output.append(f"{ch['id']}. [{ch['title']}](#{ch['id']}-{ch_slug})")
    output.append("\n---\n")
    
    for ch in chapters:
        ch_slug = ch['title'].lower().replace(" & ", "-").replace(" (", "-").replace(")", "").replace(" ", "-").replace(",", "")
        output.append(f"## {ch['id']}. {ch['title']}\n")
        
        items = final_chapters[ch['id']]
        if not items:
            output.append("*No items in this section yet. Run OCR to extract more visual notes.*\n")
        else:
            for idx, item in enumerate(items):
                output.append(f"### Q{idx+1}. {item['title']}\n")
                output.append(f"{item['body']}\n")
        output.append("\n---\n")
        
    # Backup existing visual notes first
    backup_path = visual_notes_path + ".bak"
    if os.path.exists(visual_notes_path):
        with open(visual_notes_path, 'r', encoding='utf-8') as f:
            existing_content = f.read()
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(existing_content)
    print(f"Created backup of SQL-Visual-Notes.md at {backup_path}")
    
    # Write output
    with open(visual_notes_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(output))
    print(f"Successfully consolidated everything into {visual_notes_path}!")
    
except Exception as e:
    print(f"Error in consolidation: {e}")
