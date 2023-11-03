const fs = require('fs');

console.log(process.argv);

/*  

scp *.txt root@pasciak.com:/var/www/pasciak.com/public/imugi/

*/

let requiredFilesFile = 'correct.txt';
let compareFilesFile = 'evaluated.txt';

let fileContent = fs.readFileSync(requiredFilesFile, 'utf-8');
let compareContent = fs.readFileSync(compareFilesFile, 'utf-8');

let fileContentLines = fileContent.split("\n");

let compareContentLines = compareContent.split("\n");

let missingLines = [];

for (let i = 0; i < fileContentLines.length; i++) {

    let sourceLine = fileContentLines[i];
    sourceLine = sourceLine.replaceAll('├', '-');
    sourceLine = sourceLine.replaceAll('└', '-');
    sourceLine = sourceLine.replaceAll('|', '-');
    sourceLine = sourceLine.replaceAll('│', '-');
    sourceLine = sourceLine.replaceAll('─', '-');
    sourceLine = sourceLine.replaceAll('├', '-');
    sourceLine = sourceLine.replaceAll('└', '-');
    sourceLine = sourceLine.replaceAll(' ', '-');


    let foundLine = false;

    for (let j = 0; j < compareContentLines.length; j++) {
        let searchline = compareContentLines[j];
        searchline = searchline.replaceAll('├', '-');
        searchline = searchline.replaceAll('└', '-');
        searchline = searchline.replaceAll('|', '-');
        searchline = searchline.replaceAll('│', '-');
        searchline = searchline.replaceAll('─', '-');
        searchline = searchline.replaceAll('├', '-');
        searchline = searchline.replaceAll('└', '-');
        searchline = searchline.replaceAll(' ', '-');

        if (searchline === sourceLine) {
            foundLine = true;
        }
    }

    if (!foundLine) {
        missingLines.push(sourceLine);
    }
}

console.log(missingLines);

fs.writeFileSync(`${process.argv[2] || 'default'}.txt`, JSON.stringify(missingLines, 0, 2));