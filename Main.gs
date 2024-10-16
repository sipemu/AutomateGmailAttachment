/**
 * The main entry point for the Gmail to Drive script.
 * Retrieves email addresses from a Google Sheet and processes attachments for each address.
 */
function entryPoint() {
  const config = getConfig();
  var searchQueries = getEMailAddressesFromGSheet(config.SHEET_ID, config.SHEET_NAME, config.COLUMN_NAME);

  for (var i in searchQueries) {
    var searchQuery = "from:" + searchQueries[i] + " has:attachment";
    saveInvoicesToDrive(searchQuery, config.TARGET_FOLDER_ID);
  }
}
