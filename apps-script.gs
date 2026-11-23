// KOJ Alstonville — Founding members list
// Google Sheet: Extensions > Apps Script > paste this > Deploy > New deployment > Web app
// Execute as: Me · Who has access: Anyone. Copy the /exec URL into SCRIPT_URL in index.html.
const SHEET = 'Founders';
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
  if (sh.getLastRow() === 0) sh.appendRow(['#','Date','First name','Last name','Email','Mobile','Suburb','Programs','People','Free rash guard?','Founding spot?','Source']);
  const n = sh.getLastRow(); // position in the queue (1 = first)
  sh.appendRow([n, new Date(), d.first, d.last, d.email, "'" + d.phone, d.suburb, d.programs, d.people,
    n <= 15 ? 'YES' : 'no', n <= 30 ? 'YES' : 'Waitlist', d.source]);
  return ContentService.createTextOutput(JSON.stringify({ok:true, position:n})).setMimeType(ContentService.MimeType.JSON);
}
