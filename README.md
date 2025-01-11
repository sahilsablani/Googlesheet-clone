# Google Sheets Clone

This project is a clone of Google Sheets, implemented using HTML, CSS, and JavaScript. It mimics the functionality of a spreadsheet, allowing users to input values, drag cells to fill adjacent cells, and add rows or columns dynamically. Additional features include text formatting, calculations, and text transformations like finding, replacing, and removing duplicates.

## Features

### 1. **Cell Value Editing**
   - Cells are editable, and values can be updated easily.

### 2. **Drag and Fill Functionality**
   - Users can select a range of cells and drag the value across rows or columns.
   - Values are automatically copied or incremented in the selected cells.

### 3. **Dynamic Rows and Columns**
   - Add rows or columns dynamically by using the "Add Row" and "Add Column" buttons.

### 4. **Basic Styling**
   - Selected cells during drag operations are highlighted with a thick border for better user experience.
   - A dynamic and responsive design for the entire spreadsheet.

### 5. **Font Customization**
   - **Font Size**: Change the font size of selected cells.
   - **Font Color**: Change the text color of selected cells.

### 6. **Calculations**
   - Perform calculations like:
     - **Sum**: Calculate the sum of selected numbers.
     - **Average (Avg)**: Calculate the average of selected numbers.
     - **Minimum (Min)**: Find the minimum value in selected numbers.
     - **Maximum (Max)**: Find the maximum value in selected numbers.
     - **Count**: Count the number of non-empty cells in the selected range.

### 7. **Text Transformations**
   - **Uppercase**: Convert the content of selected cells to uppercase.
   - **Lowercase**: Convert the content of selected cells to lowercase.
   - **Trim**: Remove leading and trailing whitespaces from the content of selected cells.
   - **Remove Duplicates**: Automatically remove duplicate rows within the selected range.

### 8. **Find and Replace**
   - Search for specific values within the spreadsheet and replace them with new values.
   
### 9. **Real-Time Updates**
   - When you drag a value over a range of cells, it automatically increments or copies the value as per the selection.

## Installation

To run this project locally, follow these steps:

1. Clone this repository to your local machine using the following command:
    ```bash
    git clone https://github.com/sahilsablani/Googlesheet-clone.git
    ```

2. Open the project folder:
    ```bash
    cd Googlesheet-clone
    ```

3. Open the `index.html` file in your browser to view the spreadsheet.

## Usage

- **Editing Cells**: Simply click on any cell to start editing its content.
- **Drag to Fill**: Select a cell, hover over the bottom-right corner of the selected cell, and drag across multiple cells to fill them with the current value.
- **Adding Rows/Columns**: Use the "Add Row" and "Add Column" buttons to dynamically add rows or columns to the spreadsheet.
- **Font Size and Color**: Use the toolbar options to change the font size and color of selected cells.
- **Calculations**: Select a range of cells and apply the calculation feature (Sum, Average, Min, Max, Count).
- **Text Transformations**: Select cells and use options like Uppercase, Lowercase, Trim, or Remove Duplicates.
- **Find and Replace**: Enter a value to search for and specify the replacement value.

## Technologies Used

- **HTML**: For structuring the webpage and creating the spreadsheet layout.
- **CSS**: For styling the spreadsheet and making it interactive.
- **JavaScript**: For implementing dynamic functionalities like cell editing, drag-to-fill, text transformations, calculations, and adding rows/columns.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request to merge your changes into the main branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for providing inspiration and solutions to various challenges while building this project.
