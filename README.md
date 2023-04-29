# GPT-Discord-Training
Convert Discord Messages to JSONL for GPT training!

## Installation
Requires NodeJS.
1. Download indexJSONL.js into a folder on your computer.
2. npm init
2. Create folder called "MoreTrainingData"
3. npm install csv-parser
4. Modify the script:

myAuthorID = Discord UserID of person you want to clone
Optionally, modify outputFile to match the output file name you want.

6. node indexJSONL.js

### Dont know how to use this to train?
I suggest uploading the JSONL file on https://fine-tune.labnotes.org/completions and then training with https://easygpt.io/
