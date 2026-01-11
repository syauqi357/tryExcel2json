# Learning Excel to JSON in Node.js

This project documents the journey of learning how to convert Excel files (`.xlsx`) into JSON data using Node.js.

## 🎯 Learning Roadmap

### 1. The "Easy" Way (Quick Scripts)
**Library:** `convert-excel-to-json`
*   **Pros:** Very simple API, synchronous (easy to write), good for quick hacks.
*   **Cons:** Not actively maintained, vulnerable dependencies, limited features (no formatting/formulas).
*   **When to use:** One-off scripts on your local machine where security isn't a concern.

### 2. The "Professional" Way (Production Ready)
**Library:** `exceljs`
*   **Pros:** Actively maintained, secure, supports styling, formulas, images, and streaming (for huge files).
*   **Cons:** More verbose code, asynchronous (requires `async/await`).
*   **When to use:** Web servers, production apps, or when you need to handle complex Excel features.

---

## 🚀 Checkpoints & Code Snippets

### Checkpoint 1: Simple Static Conversion
Using `convert-excel-to-json` with hardcoded columns.
```javascript
// Old approach
const result = xlsx({
    sourceFile: 'book1.xlsx',
    columnToKey: {
        A: 'name',
        B: 'age'
    }
});
```

### Checkpoint 2: Dynamic Column Mapping
Handling any number of columns by using the first row as headers.
*   **Concept:** Read raw data -> Extract first row -> Map remaining rows using those keys.

### Checkpoint 3: Modern & Secure (Current State)
Using `exceljs` for robust handling.

**Key Concepts to Master:**
1.  **Async/Await:** File I/O in Node.js should be non-blocking.
2.  **1-based Indexing:** Excel rows/cols often start at 1, not 0.
3.  **Iterators:** Using `.eachSheet()` and `.eachRow()` instead of simple arrays gives you more control.

**Current Code Pattern:**
```javascript
import ExcelJS from 'exceljs';

async function convert() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('book1.xlsx');
    
    // ... iterate sheets and rows ...
}
```

## 📚 Best Practices
1.  **Always Validate:** Never trust the input file. Check if headers match what you expect.
2.  **Use Async:** For web servers, always use asynchronous libraries (`exceljs` or `read-excel-file`) to avoid freezing the server while reading a large file.
3.  **Security:** Be careful with libraries that have "Prototype Pollution" vulnerabilities if you are accepting files from public users.

## 🛠 How to Run
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the script:
    ```bash
    node index.js
    ```
