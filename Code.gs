const SHEET_ID = '1L0GIgQFQpKyYYNLyiUQzaap9UeIbeqLU8LrQIY8sYC8';
const SHEET_NAME = 'EMAIL';
const COLUMN_NAME = 'FROM';
const TARGET_FOLDER_ID = '1GpoEtYoA2GjwQQUMSVCxjUiw2AYiaRm5';


function entryPoint() {
  var searchQueries = getEMailAddressesFromGSheet(SHEET_ID, SHEET_NAME, COLUMN_NAME);

  for (i in searchQueries) {
    var searchQuery = "from:".concat(searchQueries[i]).concat(" has:attachment");
    saveInvoicesToDrive(searchQuery, TARGET_FOLDER_ID)
  }
}


/**
 * Reads data from a specified column in a Google Sheet and logs the non-empty values.
 * 
 * @param {string} sheetId - The ID of the Google Sheet.
 * @param {string} sheetName - The name of the sheet within the Google Sheet.
 * @param {string} columnName - The name of the column to read data from.
 */
function getEMailAddressesFromGSheet(sheetId, sheetName, columnName) {
  // Open the spreadsheet using the sheet ID
  var spreadsheet = SpreadsheetApp.openById(sheetId);

  // Get the sheet by name
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log('Sheet not found');
    return;
  }

  // Get the data range for the specified column
  var dataRange = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();

  // Find the index of the specified column
  var columnIndex = -1;
  for (var i = 0; i < dataRange[0].length; i++) {
    if (dataRange[0][i] == columnName) {
      columnIndex = i;
      break;
    }
  }

  if (columnIndex == -1) {
    Logger.log('Column not found');
    return;
  }

  // Extract the data from the specified column
  var columnData = [];
  for (var j = 1; j < dataRange.length; j++) {
    var value = dataRange[j][columnIndex];
    if (value !== '') {
      columnData.push(value);
    }
  }
  return columnData;
}


/**
 * Saves new email attachments matching a search query to a specified Google Drive folder.
 * Includes a duplication check to prevent creating duplicate files.
 * 
 * @param {string} searchQuery - The Gmail search query to find relevant emails.
 * @param {string} folderId - The ID of the target Google Drive folder.
 */
function saveInvoicesToDrive(searchQuery, folderId) {
  Logger.log(searchQuery);
  var lastExecutionTime = getLastExecutionDate();
  var threads = GmailApp.search(searchQuery + " after:" + lastExecutionTime);
  var driveFolder = DriveApp.getFolderById(folderId);
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var attachments = message.getAttachments();
      for (var k = 0; k < attachments.length; k++) {
        var attachment = attachments[k];
        var fileName = attachment.getName();
        
        // Check if the file already exists in the folder
        var existingFiles = driveFolder.getFilesByName(fileName);
        var fileExists = existingFiles.hasNext();
        
        if (!fileExists && fileName.toLowerCase().endsWith('.pdf')) {
          var attachmentBlob = attachment.copyBlob();
          driveFolder.createFile(attachmentBlob).setName(fileName);
          Logger.log('File created: ' + fileName);
        } else if (fileExists) {
          Logger.log('File already exists: ' + fileName);
        } else {
          Logger.log('Skipped non-PDF file: ' + fileName);
        }
      }
    }
  }
  updateLastExecutionDate();
}

/**
 * Get the last execution date from properties.
 * 
 */
function getLastExecutionDate() {
  var properties = PropertiesService.getUserProperties();
  return properties.getProperty("lastExecutionDate") || "2024-07-01";
}

/**
 * Reset last execution date.
 * 
 */
function resetLastExecutionDate() {
  PropertiesService.getUserProperties().deleteProperty("lastExecutionDate");
}

/**
 * Update last execution date.
 * 
 */
function updateLastExecutionDate() {
  var now = new Date();
  var dateString = now.toISOString().split("T")[0];
  var properties = PropertiesService.getUserProperties();
  properties.setProperty("lastExecutionDate", dateString);
}
