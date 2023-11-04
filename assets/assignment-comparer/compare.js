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

let missingLinesText = [];

for (let i = 0; i < fileContentLines.length; i++) {

    let sourceLine = fileContentLines[i];
    sourceLine = sourceLine.replaceAll('`', '|');
    // sourceLine = sourceLine.replaceAll('|', '');

    // sourceLine = sourceLine.replaceAll('├', '-');
    // sourceLine = sourceLine.replaceAll('└', '-');
    // sourceLine = sourceLine.replaceAll('|', '-');
    // sourceLine = sourceLine.replaceAll('│', '-');
    // sourceLine = sourceLine.replaceAll('─', '-');
    // sourceLine = sourceLine.replaceAll('├', '-');
    // sourceLine = sourceLine.replaceAll('└', '-');
    // sourceLine = sourceLine.replaceAll(' ', '-');


    let foundLine = false;

    for (let j = 0; j < compareContentLines.length; j++) {
        let searchline = compareContentLines[j];
        searchline = searchline.replaceAll('`', '|');
        // searchline = searchline.replaceAll('|', '');

        // searchline = searchline.replaceAll('├', '-');
        // searchline = searchline.replaceAll('└', '-');
        // searchline = searchline.replaceAll('|', '-');
        // searchline = searchline.replaceAll('│', '-');
        // searchline = searchline.replaceAll('─', '-');
        // searchline = searchline.replaceAll('├', '-');
        // searchline = searchline.replaceAll('└', '-');
        // searchline = searchline.replaceAll(' ', '-');

        if (searchline === sourceLine) {
            foundLine = true;
        }
    }

    let templateLine = `<p style='color:red;'>${sourceLine}</p>\n`;

    if (!foundLine) {
        if (sourceLine.indexOf('logo.png') >= 0) {
            templateLine = templateLine.replace('color:red', 'color:brown');
        }
        if (sourceLine.indexOf('do_while.js') >= 0) {
            templateLine = templateLine.replace('color:red', 'color:brown');
        }
        if (sourceLine.indexOf('js-html.html') >= 0) {
            templateLine = templateLine.replace('color:red', 'color:brown');
        }
        missingLines.push(templateLine);
        missingLinesText.push(sourceLine);
    } else {
        templateLine = templateLine.replace('color:red', 'color:green');
        missingLines.push(templateLine);
    }
}

console.log(missingLinesText);

let htmlTemplate = `

<html>
<head>
</head>
<style>
* {
    line-height: .5;
    margin:0;
}
</style>
<body>
${missingLines.join('<br>')}
</body>
</html>
`


fs.writeFileSync(`${process.argv[2] || 'default'}.txt`, JSON.stringify(missingLinesText, 0, 2));

fs.writeFileSync(`${process.argv[2] || 'default'}.html`, htmlTemplate);