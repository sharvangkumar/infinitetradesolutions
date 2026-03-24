/**
 * GOOGLE APPS SCRIPT — Infinite Trade Solutions Enquiry Logger
 * ============================================================
 * Paste this into Google Apps Script (script.google.com)
 * and deploy as a Web App (Anyone can access).
 *
 * Every form submission will be saved as a new row in your sheet.
 */

const SHEET_NAME = 'Enquiries' // Tab name in your Google Sheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME)

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'First Name', 'Last Name', 'Email',
        'Phone', 'Country', 'Product Enquired', 'Message'
      ])
      // Bold the header row
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold')
      sheet.setFrozenRows(1)
    }

    // Append the new enquiry row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.country || '',
      data.product || 'General Enquiry',
      data.message || ''
    ])

    // Optional: Send email notification to yourself
    // MailApp.sendEmail({
    //   to: 'info@infinitetrade.com',
    //   subject: `New Enquiry from ${data.firstName} (${data.country})`,
    //   body: `Product: ${data.product}\n\nMessage: ${data.message}\n\nEmail: ${data.email}\nPhone: ${data.phone}`
    // })

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Test this function manually in Apps Script editor
function testPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+91 9999999999',
        country: 'India',
        product: 'JCB 3DX',
        message: 'Test enquiry message',
        timestamp: new Date().toISOString()
      })
    }
  }
  Logger.log(doPost(mockEvent))
}
