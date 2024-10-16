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
