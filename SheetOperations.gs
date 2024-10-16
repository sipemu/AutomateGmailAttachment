/**
 * Reads data from a specified column in a Google Sheet and returns non-empty values.
 * 
 * @param {string} sheetId - The ID of the Google Sheet.
 * @param {string} sheetName - The name of the sheet within the Google Sheet.
 * @param {string} columnName - The name of the column to read data from.
 * @returns {Array<string>} An array of non-empty values from the specified column.
 */
function getEMailAddressesFromGSheet(sheetId, sheetName, columnName) {
  var spreadsheet = SpreadsheetApp.openById(sheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    Logger.log('Sheet not found');
    return [];
  }

  var dataRange = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
  var columnIndex = dataRange[0].indexOf(columnName);

  if (columnIndex === -1) {
    Logger.log('Column not found');
    return [];
  }

  return dataRange.slice(1)
    .map(row => row[columnIndex])
    .filter(value => value !== '');
}
