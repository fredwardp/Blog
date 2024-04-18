import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const readJsonFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, buff) => {
      if (err) return rej(err);
      const jsonString = buff.toString();
      const jsObj = JSON.parse(jsonString);
      res(jsObj);
    });
  });
};

export const readBlogArticle = () => {
  return readJsonFile(__dirname + "/data/blog-articles.json");
};

const writeJsonFile = (path, jsObj) => {
  return new Promise((res, rej) => {
    const jsonData = JSON.stringify(jsObj, null, 2);
    fs.writeFile(path, jsonData, (err) => {
      if (err) return rej(err);
      res(jsObj);
    });
  });
};

export const writeBlogArticle = (jsObj) => {
  return writeJsonFile(__dirname + "/data/blog-articles.json", jsObj);
};
