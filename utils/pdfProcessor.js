const pdfParse = require("pdf-parse");

async function processPDFBuffer(pdfBuffer) {
  const data = await pdfParse(pdfBuffer);
  return data.text.trim();
}
module.export = processPDFBuffer;