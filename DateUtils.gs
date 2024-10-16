/**
 * Get the last execution date from user properties.
 * 
 * @returns {string} The last execution date or a default date if not set.
 */
function getLastExecutionDate() {
  var properties = PropertiesService.getUserProperties();
  return properties.getProperty("lastExecutionDate") || "2024-07-01";
}

/**
 * Reset the last execution date by removing it from user properties.
 */
function resetLastExecutionDate() {
  PropertiesService.getUserProperties().deleteProperty("lastExecutionDate");
}

/**
 * Update the last execution date to the current date in user properties.
 */
function updateLastExecutionDate() {
  var now = new Date();
  var dateString = now.toISOString().split("T")[0];
  var properties = PropertiesService.getUserProperties();
  properties.setProperty("lastExecutionDate", dateString);
}
