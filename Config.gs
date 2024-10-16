/**
 * Configuration constants for the Gmail to Drive script.
 * @const {string} SHEET_ID - The ID of the Google Sheet containing email addresses.
 * @const {string} SHEET_NAME - The name of the sheet within the Google Sheet.
 * @const {string} COLUMN_NAME - The name of the column containing email addresses.
 * @const {string} TARGET_FOLDER_ID - The ID of the Google Drive folder where attachments will be saved.
 */
const SHEET_ID = '1L0GIgQFQpKyYYNLyiUQzaap9UeIbeqLU8LrQIY8sYC8';
const SHEET_NAME = 'EMAIL';
const COLUMN_NAME = 'FROM';
const TARGET_FOLDER_ID = '1GpoEtYoA2GjwQQUMSVCxjUiw2AYiaRm5';

/**
 * Retrieves configuration from script properties.
 * @returns {Object} Configuration object
 * @throws {Error} If any required property is not set
 */
function getConfig() {
  const properties = PropertiesService.getScriptProperties();
  const config = {
    SHEET_ID: properties.getProperty('SHEET_ID'),
    SHEET_NAME: properties.getProperty('SHEET_NAME'),
    COLUMN_NAME: properties.getProperty('COLUMN_NAME'),
    TARGET_FOLDER_ID: properties.getProperty('TARGET_FOLDER_ID')
  };

  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Configuration parameter ${key} is not set. Please set it in the script properties.`);
    }
  }

  return config;
}
