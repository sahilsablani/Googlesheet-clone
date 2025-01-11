// DOM elements
const spreadsheet = document.getElementById("spreadsheet");
const tableBody = document.getElementById("table-body");
const columnHeaders = document.getElementById("column-headers");
const formulaBar = document.getElementById("formula-bar");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const fontSizeSelect = document.getElementById("font-size");
const fontColorPicker = document.getElementById("font-color");
const addRowBtn = document.getElementById("add-row-btn");
const addColBtn = document.getElementById("add-col-btn");
document.getElementById("remove-duplicates-btn").addEventListener("click", removeDuplicates);
document.getElementById("find-replace-btn").addEventListener("click", () => {
  const findText = prompt("Enter text to find:");
  const replaceText = prompt("Enter replacement text:");
  findAndReplace(findText, replaceText);
});

const rows = 10;
const cols = 10;

// Initialize spreadsheet
function createSpreadsheet() {
  // Create column headers (A, B, C, ...)
  columnHeaders.innerHTML = "<th></th>";
  for (let i = 0; i < cols; i++) {
    const th = document.createElement("th");
    th.textContent = String.fromCharCode(65 + i); // ASCII values for A, B, C, ...
    columnHeaders.appendChild(th);
  }

  // Create table rows
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    const rowHeader = document.createElement("th");
    rowHeader.textContent = i + 1;
    tr.appendChild(rowHeader);

    for (let j = 0; j < cols; j++) {
      const td = document.createElement("td");
      td.contentEditable = "true";
      td.setAttribute("data-cell", `${String.fromCharCode(65 + j)}${i + 1}`);
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  }
}

// Bold functionality using execCommand
boldBtn.addEventListener("click", () => {
  document.execCommand("bold");
});

// Italic functionality using execCommand
italicBtn.addEventListener("click", () => {
  document.execCommand("italic");
});

// Font size functionality using execCommand
fontSizeSelect.addEventListener("change", () => {
  const fontSize = fontSizeSelect.value.replace("px", "");
  document.execCommand("fontSize", false, "7"); // Temporary size
  const fontElements = document.querySelectorAll("font[size='7']");
  fontElements.forEach((el) => {
    el.removeAttribute("size");
    el.style.fontSize = fontSize + "px";
  });
});

// Font color functionality using execCommand
fontColorPicker.addEventListener("input", () => {
  const color = fontColorPicker.value;
  document.execCommand("foreColor", false, color);
});

// Formula calculation
// Updated Formula Calculation
document.getElementById('calculate-btn').addEventListener('click', function () {
    const formula = document.getElementById('formula-bar').value.trim();

    // Validate that a formula is entered
    if (formula === "") {
        alert("Please enter a formula.");
        return;
    }

    // Check if the formula starts with '=' and process it accordingly
    if (formula.startsWith("=")) {
        const formulaContent = formula.slice(1).trim(); // Remove the '=' sign

        // Match basic formulas (SUM, AVERAGE, MAX, MIN, COUNT)
        const regex = /^(SUM|AVERAGE|MAX|MIN|COUNT)\((.*)\)$/i;
        const match = formulaContent.match(regex);

        if (match) {
            const functionName = match[1].toUpperCase(); // Function (SUM, AVERAGE, etc.)
            const range = match[2].trim(); // Range (e.g., A1:C3)

            const result = calculateFormula(functionName, range);
            document.getElementById('formula-bar').value = result; // Show result in formula bar
        } else {
            alert("Invalid formula format. Use functions like =SUM(A1:C3)");
        }
    } else {
        alert("Formula should start with '='.");
    }
});

// Function to calculate the formula
function calculateFormula(functionName, range) {
    // Parse the range (e.g., A1:C3) into start and end cell references
    const [startCell, endCell] = range.split(':');
    if (!startCell || !endCell) {
        alert("Invalid range format. Use formats like A1:C3.");
        return "Error";
    }

    const startRow = parseInt(startCell.slice(1)) - 1; // Convert A1 -> row index (0-based)
    const startCol = columnToIndex(startCell.charAt(0)); // Convert A -> col index (0-based)
    const endRow = parseInt(endCell.slice(1)) - 1;
    const endCol = columnToIndex(endCell.charAt(0));

    // Validate range
    if (isNaN(startRow) || isNaN(endRow) || startRow < 0 || endRow < 0 || startCol < 0 || endCol < 0) {
        alert("Invalid cell references in the range.");
        return "Error";
    }

    // Get the table rows and cells
    const rows = document.querySelectorAll('#spreadsheet tbody tr');
    const values = [];

    // Extract values within the range
    for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
            const cell = rows[i]?.cells[j + 1]; // Skip row headers
            if (cell) {
                const cellValue = parseFloat(cell.textContent.trim());
                if (!isNaN(cellValue)) {
                    values.push(cellValue);
                }
            }
        }
    }

    // Calculate based on the function type
    switch (functionName) {
        case 'SUM':
            return values.reduce((acc, val) => acc + val, 0);
        case 'AVERAGE':
            return values.length ? values.reduce((acc, val) => acc + val, 0) / values.length : 0;
        case 'MAX':
            return values.length ? Math.max(...values) : "No values";
        case 'MIN':
            return values.length ? Math.min(...values) : "No values";
        case 'COUNT':
            return values.length;
        default:
            return "Invalid function";
    }
}

// Helper function to convert column letters (e.g., A, B, C) to index (0, 1, 2)
function columnToIndex(column) {
    return column.charCodeAt(0) - 'A'.charCodeAt(0);
}

// Drag Function
// Global state to track the drag operation
let isDragging = false;
let startCell = null;
let selectedCells = [];

// Function to handle mouse events for drag-to-fill
function handleDragFill() {
  spreadsheet.addEventListener('mousedown', (event) => {
    // Ensure we are clicking on a contenteditable cell
    if (event.target.tagName === 'TD' && event.target.isContentEditable) {
      isDragging = true;
      startCell = event.target;
      selectedCells = [startCell];
      startCell.classList.add('selected'); // Mark the starting cell as selected
    }
  });

  spreadsheet.addEventListener('mousemove', (event) => {
    // While dragging, highlight cells as we move the mouse over them
    if (isDragging && event.target.tagName === 'TD' && event.target.isContentEditable) {
      if (!selectedCells.includes(event.target)) {
        selectedCells.push(event.target);
        event.target.classList.add('selected'); // Add to selected cells
      }
      event.target.classList.add('dragging'); // Thicker border while dragging
    }
  });

  spreadsheet.addEventListener('mouseup', (event) => {
    if (isDragging) {
      isDragging = false;
      
      // Get the value of the first selected cell
      const value = startCell.textContent.trim();
      const isNumber = !isNaN(value) && value !== ''; // Check if it's a valid number
      
      // Fill the selected cells with incremented values if the value is numeric, or the same value
      selectedCells.forEach((cell, index) => {
        if (index > 0 && isNumber) {
          // Increment the value for each cell
          cell.textContent = parseInt(value) + index;
        } else if (index > 0) {
          // If it's not a number, keep the same value
          cell.textContent = value;
        }
        
        // Remove selected and dragging classes after filling the cells
        cell.classList.remove('selected', 'dragging');
      });

      // Clear selected cells array
      selectedCells = [];
    }
  });
}

// Initialize the drag-fill functionality
handleDragFill();




// Add row functionality
addRowBtn.addEventListener("click", () => {
  const tr = document.createElement("tr");
  const rowHeader = document.createElement("th");
  rowHeader.textContent = tableBody.children.length + 1;
  tr.appendChild(rowHeader);

  for (let i = 0; i < columnHeaders.children.length - 1; i++) {
    const td = document.createElement("td");
    td.contentEditable = "true";
    td.setAttribute("data-cell", `${String.fromCharCode(65 + i)}${tableBody.children.length + 1}`);
    tr.appendChild(td);
  }

  tableBody.appendChild(tr);
});

// Add column functionality
addColBtn.addEventListener("click", () => {
  const colIndex = columnHeaders.children.length;
  const th = document.createElement("th");
  th.textContent = String.fromCharCode(65 + colIndex - 1);
  columnHeaders.appendChild(th);

  [...tableBody.children].forEach((row, i) => {
    const td = document.createElement("td");
    td.contentEditable = "true";
    td.setAttribute("data-cell", `${String.fromCharCode(65 + colIndex - 1)}${i + 1}`);
    row.appendChild(td);
  });
});


// TRIM: Removes leading and trailing spaces from a cell
document.getElementById("trim-btn").addEventListener("click", () => {
    const selection = window.getSelection(); // Get the current selection
    const selectedText = selection.toString(); // Get the selected text

    if (selectedText) {
        // Create a range for the selected text
        const range = selection.getRangeAt(0);

        // Trim the selected text (remove leading and trailing spaces)
        const trimmedText = selectedText.trim();

        // Replace the selected text with the trimmed version
        range.deleteContents();
        range.insertNode(document.createTextNode(trimmedText));
    }
});
  
  // UPPER: Converts the text in a cell to uppercase
// Uppercase button click handler
document.getElementById("upper-btn").addEventListener("click", () => {
    const selection = window.getSelection(); // Get the current selection
    const selectedText = selection.toString(); // Get the selected text

    if (selectedText) {
        // Create a range for the selected text
        const range = selection.getRangeAt(0);

        // Convert selected text to uppercase
        const uppercasedText = selectedText.toUpperCase();

        // Replace the selected text with the uppercase version
        range.deleteContents();
        range.insertNode(document.createTextNode(uppercasedText));
    }
});

// Lowercase button click handler
document.getElementById("lower-btn").addEventListener("click", () => {
    const selection = window.getSelection(); // Get the current selection
    const selectedText = selection.toString(); // Get the selected text

    if (selectedText) {
        // Create a range for the selected text
        const range = selection.getRangeAt(0);

        // Convert selected text to lowercase
        const lowercasedText = selectedText.toLowerCase();

        // Replace the selected text with the lowercase version
        range.deleteContents();
        range.insertNode(document.createTextNode(lowercasedText));
    }
});

  
  // REMOVE_DUPLICATES: Removes duplicate rows in a selected range
  function removeDuplicates() {
    const rows = Array.from(tableBody.children);
    const seenRows = new Set();
    
    rows.forEach((row) => {
      const rowText = Array.from(row.children)
        .slice(1) // Exclude row header
        .map((cell) => cell.textContent.trim())
        .join(",");
      
      if (seenRows.has(rowText)) {
        row.remove();
      } else {
        seenRows.add(rowText);
      }
    });
  }
  
  // FIND_AND_REPLACE: Finds and replaces text in a range of cells
  function findAndReplace(findText, replaceText) {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      if (cell.textContent.includes(findText)) {
        cell.textContent = cell.textContent.replace(new RegExp(findText, "g"), replaceText);
      }
    });
  }

// Initialize
createSpreadsheet();
