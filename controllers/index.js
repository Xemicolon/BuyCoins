const fs = require("fs");
const path = require("path");

const extensions = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
};

exports.getFile = (filePath, res, mimeType) => {
  let fileExists = fs.existsSync(filePath);
  if (fileExists) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.dir(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": mimeType,
        "Content-Length": data.length,
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("Page not found!");
  }
};

exports.render = (req, res) => {
  let fileName = path.join(req.url) || "index.html";
  let ext = path.extname(fileName);
  let localFolder = path.dirname(__dirname) + `\\`;

  if (!extensions[ext]) {
    console.log(fileName);
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("Page not found!");
    return;
  }
  this.getFile(localFolder + fileName, res, extensions[ext]);
};

exports.hello = () => {
  console.log("hi");
};
