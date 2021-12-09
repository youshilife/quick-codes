/**
 * ============================================================================
 * 构建
 * ============================================================================
 *
 * 自动构建侧边栏的内容列表。
 *
 */

const fs = require("fs");
const path = require("path");

// ----------------------------------------------------------------------------
// 函数定义
// ----------------------------------------------------------------------------

/**
 * 获取指定文件路径的简单名称
 *
 * @param {string} filePath 文件路径
 */
function getSimpleName(filePath) {
    let name = path.basename(filePath);
    // 移除文件名开头的排序值
    name = name.replace(/^\d+( |_)/, "");
    // 移除尾部的扩展名
    name = name.replace(/\..*$/, "");
    return name;
}

/**
 * 递归获取指定目录下的内容列表
 *
 * @param {string} dirPath 目录路径
 * @param {string} urlDirPath URL目录路径
 * @param {number} level 当前层级
 */
function getContentsOfDir(dirPath, urlDirPath, level) {
    // 内容列表
    let contents = "";
    // 当前层级的前导空格
    let prefix = "    ".repeat(level - 1);

    // 读取当前文件夹下的文件列表
    let fileNames = fs.readdirSync(dirPath);
    // 按字符编码顺序排序
    fileNames.sort();
    for (let fileName of fileNames) {
        // 当前文件的绝对路径
        let filePath = path.resolve(dirPath, fileName);
        // 当前文件的简单名称
        let name = getSimpleName(fileName).replace(/ /g, "&nbsp;");
        // 当前文件的访问URL
        let url = (urlDirPath + "/" + fileName).replace(/ /g, "%20");

        // 如果是目录
        if (fs.statSync(filePath).isDirectory()) {
            contents += `${prefix}- 📂 ${name}\n`;
            contents += getContentsOfDir(filePath, url, level + 1);
        }
        // 如果是不以_开头的Markdown文件，且不是README.md
        else if (/^[^_].*\.md$/.test(fileName) && fileName.toLowerCase() !== "readme.md") {
            contents += `${prefix}- [${name}](${url})\n`;
        }
    }

    return contents;
}

// ----------------------------------------------------------------------------
// 执行
// ----------------------------------------------------------------------------

// 文档文件夹
let docsDirPath = path.resolve("docs");
// 侧边栏文件输出路径
let sidebarFilePath = path.resolve(docsDirPath, "_sidebar.md");

// 计算内容列表
let contents = getContentsOfDir(docsDirPath, "", 1);
// 写入文件
fs.writeFileSync(sidebarFilePath, contents);
