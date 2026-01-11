import ExcelJS from 'exceljs';

async function convert() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('book1.xlsx');

    const result = {};

    workbook.eachSheet((sheet, sheetId) => {
        const sheetData = [];
        
        // Get the first row as headers
        // Note: exceljs rows are 1-based
        const firstRow = sheet.getRow(1);
        if (!firstRow.values || firstRow.values.length === 0) return;

        // exceljs adds an empty item at index 0 for 1-based indexing, so we slice it off
        const headers = firstRow.values;

        // Iterate over the rest of the rows
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header row

            const rowData = {};
            row.eachCell((cell, colNumber) => {
                // headers array might have empty slots if columns are skipped, 
                // but usually headers[colNumber] works fine.
                const header = headers[colNumber];
                if (header) {
                    rowData[header] = cell.value;
                }
            });
            sheetData.push(rowData);
        });

        result[sheet.name] = sheetData;
    });

    console.log(JSON.stringify(result, null, 2));
}

convert();