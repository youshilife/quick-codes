const fs = require("fs");
const path = require("path");

let lines = fs.readFileSync("contents.md", {encoding: "UTF-8"}).split("\n");
let markdown = "";
for (let line of lines) {
    if (line.startsWith("- ")) {
        let dirName = line.substring(2).trim();
        // 若目录存在
        if (fs.existsSync(dirName)) {
            let innerMarkdown = "";
            let files = fs.readdirSync(dirName);
            for (let fileName of files) {
                let name = fileName.replace(/\.md$/, "").trim().replace(/ /g, "&nbsp;");
                let url = `/${dirName}/${fileName}`.replace(/ /g, "%20");
                innerMarkdown += `    - [${name}](${url})\n`;
            }

            if (innerMarkdown) {
                markdown += `- 📂 ${dirName}\n`;
                markdown += innerMarkdown;
            }
        }
    } else {
        markdown += line + "\n";
    }
}

fs.writeFileSync("_sidebar.md", markdown);
