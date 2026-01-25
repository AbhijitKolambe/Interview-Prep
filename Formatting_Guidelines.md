# Standard Formatting Guidelines

Use these guidelines when formatting Markdown documentation files in this repository.

## 1. Requirements

*   **Remove Icons**: Eliminate all extraneous emojis and Unicode icons (e.g., ✅, 👉, 🔥, ⭐, ❌, ⏳).
*   **Table of Contents**: Insert a clear `Table of Contents` at the top of the file, linking to the main sections.
*   **Numbering**: Sequentially number the main section headers (e.g., `1. Topic`, `2. Next Topic`).
*   **Code Blocks**: Ensure all code snippets are enclosed in triple backticks with the appropriate language tag (e.g., ` ```javascript ` or ` ```typescript `).
*   **Tables**: Format data comparisons as proper Markdown tables.
*   **Remove Duplicates**: Identify and remove any repeated questions, topics, or identical sections to ensure the content is concise and unique.

## 2. Formatting Example

### Input (Do NOT use)
> 👉 **Topic A**
> ✅ This is good.
> 
> code: const a = 1;
>
> *(Later in file)*
> 👉 **Topic A** (Repeated)

### Output (Use this style)
> ## 1. Topic A
> This is good.
> 
> ```javascript
> const a = 1;
> ```
> *(Duplicate removed)*

## 3. Prompt Template
To apply this format to a new file, use the following prompt:

> "Format this file following the standards defined in `d:\Interview-Prep\Formatting_Guidelines.md`. Remove all icons, add a Table of Contents, number the sections, ensure proper code syntax highlighting, and strictly remove any duplicate questions or content."
