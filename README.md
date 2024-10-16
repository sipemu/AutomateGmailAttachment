# Gmail to Google Drive Attachment Saver

This Google Apps Script project automatically saves PDF attachments from specified Gmail senders to a designated Google Drive folder. It uses a Google Sheet to manage the list of email addresses to monitor.

## Features

- Reads email addresses from a specified Google Sheet
- Searches for emails from those addresses with attachments
- Saves PDF attachments to a specified Google Drive folder
- Avoids duplicate files
- Keeps track of the last execution date to avoid processing the same emails twice

## Files

1. `Config.gs`: Contains configuration constants
2. `Main.gs`: The main entry point for the script
3. `SheetOperations.gs`: Handles reading data from Google Sheets
4. `GmailOperations.gs`: Manages Gmail searches and saving attachments to Drive
5. `DateUtils.gs`: Utilities for managing the last execution date

## Configuration

This script uses Google Apps Script's Properties Service to store configuration parameters. You need to set these properties before running the script.

### Setting Script Properties

1. Open your Google Apps Script project in the Google Apps Script editor.
2. Click on "Project Settings" (cog icon) in the left sidebar.
3. Scroll down to the "Script Properties" section.
4. Click "Add script property" and add the following properties:
   - `SHEET_ID`: The ID of your Google Sheet
   - `SHEET_NAME`: The name of the sheet containing email addresses
   - `COLUMN_NAME`: The name of the column containing email addresses
   - `TARGET_FOLDER_ID`: The ID of the Google Drive folder where attachments will be saved
5. Click "Save" to save your script properties.

### Property Descriptions

- `SHEET_ID`: This is the long string of characters in the URL of your Google Sheet between '/d/' and '/edit'.
- `SHEET_NAME`: The name of the specific sheet tab in your Google Sheet (usually visible at the bottom of the sheet).
- `COLUMN_NAME`: The header of the column containing the email addresses you want to monitor.
- `TARGET_FOLDER_ID`: This is the long string of characters in the URL of your Google Drive folder after 'folders/'.

If any of these properties are not set when the script runs, it will throw an error with a message indicating which property is missing.

## Setup and Deployment

### Prerequisites

1. Node.js and npm installed on your machine
2. Google account with access to Google Apps Script

### Steps to Deploy

1. Install clasp globally:
   ```
   npm install -g @google/clasp
   ```

2. Login to your Google account:
   ```
   clasp login
   ```

3. Create a new Google Apps Script project:
   ```
   clasp create --type sheets --title "Gmail to Drive Attachment Saver"
   ```

4. Clone this repository or create the script files locally.

5. Update the `Config.gs` file with your specific Google Sheet ID and target Google Drive folder ID.

6. Push the code to Google Apps Script:
   ```
   clasp push
   ```

7. Open the script in the Google Apps Script editor:
   ```
   clasp open
   ```

### Setting up a Time-based Trigger

1. In the Google Apps Script editor, click on the clock icon on the left sidebar to open the Triggers page.

2. Click the "+ Add Trigger" button in the bottom right corner.

3. In the "Choose which function to run" dropdown, select `entryPoint`.

4. Under "Select event source", choose "Time-driven".

5. Select the type of time-based trigger you want (e.g., "Day timer" to run daily).

6. Choose the time of day you want the script to run.

7. Click "Save" to create the trigger.

## Usage

1. Set up the script properties as described in the Configuration section above.
2. Ensure your Google Sheet is set up with a column containing the email addresses you want to monitor.
3. The script will automatically run based on the trigger you set up, searching for emails from the specified addresses and saving PDF attachments to the designated Google Drive folder.
4. You can also run the `entryPoint` function manually from the Google Apps Script editor to process emails immediately.

## Customization

- Modify the `SHEET_ID`, `SHEET_NAME`, `COLUMN_NAME`, and `TARGET_FOLDER_ID` in `Config.gs` to match your specific Google Sheet and Drive folder.
- Adjust the search query in `Main.gs` if you want to change the criteria for which emails to process.
- Modify the file type check in `GmailOperations.gs` if you want to save attachments other than PDFs.

## Troubleshooting

- If you encounter a "Configuration parameter X is not set" error, make sure you've correctly set all required script properties as described in the Configuration section.
- If you encounter issues, check the Execution log in the Google Apps Script editor for error messages.
- Ensure you have the necessary permissions for the Google Sheet and Drive folder you're accessing.
- Verify that your Gmail search query is correctly formatted and returning the expected results.

## Contributing

Feel free to fork this project and submit pull requests with any improvements or bug fixes.

## License

This project is licensed under the MIT License.
