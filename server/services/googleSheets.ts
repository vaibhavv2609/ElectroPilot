import { google } from 'googleapis';

const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}';
const SHEET_ID = process.env.GOOGLE_SHEET_ID || process.env.SHEET_ID || 'default_sheet_id';

let sheets: any = null;

async function initializeSheets() {
  if (sheets) return sheets;

  try {
    const credentials = JSON.parse(GOOGLE_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    throw new Error(`Failed to initialize Google Sheets: ${error.message}`);
  }
}

export async function appendUserData(name: string, phone: string, timestamp: Date): Promise<void> {
  try {
    const sheetsApi = await initializeSheets();
    
    const values = [
      [name, phone, timestamp.toISOString()]
    ];

    await sheetsApi.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error('Failed to append to Google Sheets:', error.message);
    // Don't throw error to prevent blocking the main flow
  }
}
