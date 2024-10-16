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
  
  threads.forEach(function(thread) {
    thread.getMessages().forEach(function(message) {
      message.getAttachments().forEach(function(attachment) {
        var fileName = attachment.getName();
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
      });
    });
  });
  
  updateLastExecutionDate();
}
