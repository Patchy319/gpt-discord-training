# GPT-Discord-Training
Convert Discord Messages to JSONL for GPT training!

## Getting Messages
Use DiscordChatExporter (https://github.com/Tyrrrz/DiscordChatExporter) to get discord messages, export as CSV. Put the CSV files into MoreTrainingData folder.

## Installation
Requires NodeJS.
1. Download indexJSONL.js into a folder on your computer.
2. npm init
3. npm install csv-parser
4. Create folder called "MoreTrainingData"
5. Modify the script:

myAuthorID = Discord UserID of person you want to clone
Optionally, modify outputFile to match the output file name you want.

6. node indexJSONL.js

### Dont know how to use this to train?
I suggest uploading the JSONL file on https://fine-tune.labnotes.org/completions and then training with https://easygpt.io/
