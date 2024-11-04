const fs = require("fs");
const path = require("path");

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

async function extractJsonData() {
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }

        // Filter to get only .js files
        const jsFiles = files.filter(file => path.extname(file) === ".js");

        jsFiles.forEach(file => {
            const filePath = path.join(inputDir, file);
            const outputFilePath = path.join(outputDir, `${path.parse(file).name}.json`);

            try {
                const data = require(filePath);

                fs.writeFile(outputFilePath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        console.error(`Error writing ${outputFilePath}:`, err);
                    } else {
                        console.log(`Data successfully written to ${outputFilePath}`);
                    }
                });
            } catch (error) {
                console.error(`Error reading ${file}:`, error);
            }
        });
    });
}

extractJsonData();
