const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const myAuthorID = '536755885628981248';
const outputFile = 'formatted-messages-mega.jsonl';

function getAllCsvFiles(directory) {
  return fs.readdirSync(directory).filter((file) => {
    return path.extname(file).toLowerCase() === '.csv';
  }).map((file) => {
    return path.join(directory, file);
  });
}

const inputFiles = getAllCsvFiles('MoreTrainingData');

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function convertToLiteral(value) {
  if (typeof value === 'number') {
    return value.toString() + '?';
  }
  if (isNumeric(value)) {
    return value.toString() + '?';
  } else if (typeof value === 'boolean') {
    return value ? 'True!' : 'false...';
  } else if (value == 'true') {
    return 'True!';
  } else if (value == 'false') {
    return 'false...';
  }
  return value;
}

function processCsvFile(inputFile) {
  return new Promise((resolve) => {
    const messages = [];
    fs.createReadStream(inputFile)
      .pipe(csvParser())
      .on('data', (row) => {
        messages.push(row);
      })
      .on('end', () => {
        const outputData = [];
        let previousMessage = null;
        let lastNonNullPrompt = null;

        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];

          if (message.AuthorID === myAuthorID) {
            if (previousMessage) {
              if (previousMessage.AuthorID === myAuthorID && outputData.length > 0) {
                outputData[outputData.length - 1].completion += ` ${convertToLiteral(previousMessage.Content)}`;
              } else {
                const prompt = convertToLiteral(previousMessage.Content) || lastNonNullPrompt;
                const completion = convertToLiteral(message.Content).trim();

                if (prompt && completion) {
                  outputData.push({
                    prompt: prompt,
                    completion: completion,
                  });
                  lastNonNullPrompt = prompt;
                }
              }
            }
          }

          previousMessage = message;
        }
        resolve(outputData);
      });
  });
}

Promise.all(inputFiles.map((inputFile) => processCsvFile(inputFile)))
  .then((results) => {
    const combinedData = results.flat();
    const jsonlData = combinedData.map((entry) => JSON.stringify(entry)).join('\n');
    return fs.promises.writeFile(outputFile, jsonlData);
  })
  .then(() => {
    console.log('JSONL file with prompt and completion has been created.');
  })
  .catch((err) => {
    console.error('Error writing JSONL file:', err);
  });