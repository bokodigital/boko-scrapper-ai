const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const exportToGoogleSheets = async (req, res) => {
  try {
    const { data, headers, name, summary, accessToken } = req.body;

    // Initialize Google API client
    const oauth2Client = new OAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Create a new spreadsheet using the drive.file scope
    // Note: With drive.file scope, we can only access files created by the app
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    
    // First create an empty spreadsheet file using Drive API
    const fileMetadata = {
      name: `${name} - Research Results`,
      mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    
    const file = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });
    
    const spreadsheetId = file.data.id;

    // Prepare data for Google Sheets
    let values = [
      headers, // Headers row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Convert arrays to comma-separated strings
          if (Array.isArray(value)) {
            return value.join(', ')
          }
          return value
        })
      )
    ]

    // Add summary if it exists
    if (summary) {
      values.push([]); // Empty row for spacing
      values.push(['Market Analysis']); // Summary header
      values.push([summary]); // Summary content
    }

    // Write data to the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return res.status(200).json({
      success: true,
      spreadsheetId: spreadsheetId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    });
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  exportToGoogleSheets,
}; 