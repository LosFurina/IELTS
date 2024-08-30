const fs = require('fs');
const path = require('path');
const markdownpdf = require('markdown-pdf');

// Function to convert Markdown to PDF
function convertMarkdownToPdf(markdownFilePath) {
  const pdfDir = path.join('pdf', path.dirname(markdownFilePath));
  const pdfFilePath = path.join(pdfDir, path.basename(markdownFilePath, '.md') + '.pdf');

  // Create the pdf directory if it doesn't exist
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    markdownpdf()
      .from(markdownFilePath)
      .to(pdfFilePath, (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`Converted ${markdownFilePath} to ${pdfFilePath}`);
        resolve();
      });
  });
}

// Main function to find all .md files and convert them
async function main() {
  try {
    const files = fs.readdirSync('.').filter(file => file.endsWith('.md'));

    for (const file of files) {
      await convertMarkdownToPdf(file);
    }

    console.log('All Markdown files have been converted to PDF.');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
