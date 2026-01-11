import xlsx from 'convert-excel-to-json';

const rawData = xlsx({ sourceFile: 'book1.xlsx' });

const result = {};

for (const sheetName in rawData) {
    const rows = rawData[sheetName];
    const headers = rows.shift(); // Take the first row as headers

    // Map the rest of the rows using the headers
    result[sheetName] = rows.map(row => {
        const newRow = {};
        for (const col in row) {
            newRow[headers[col]] = row[col];
        }
        return newRow;
    });
}

console.log(JSON.stringify(result, null, 2));