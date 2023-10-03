import express from "express";
import * as fs from "fs";

const folder = "./files/";

const PORT = 8000;

const app = express();

function formatFileSize(kilobytes) {
  if (kilobytes >= 1024 * 1024) {
    // Convert to gigabytes with two decimal places
    return (kilobytes / (1024 * 1024)).toFixed(2) + " GB";
  } else if (kilobytes >= 1024) {
    // Convert to megabytes with two decimal places
    return (kilobytes / 1024).toFixed(2) + " MB";
  } else {
    // Display in kilobytes
    return kilobytes + " KB";
  }
}

app.set("view engine", "pug");
app.use(express.static("public"));
app.get("/", (req, res) => {
  let files = fs.readdirSync(folder);
  let items = [];
  for (let path of files) {
    let stats = fs.statSync(`${folder}/${path}`);
    items.push({
      url: path,
      size: formatFileSize(Math.round(stats.size / 1024)),
    });
  }
  if (files.length > 0) {
    res.render("index", {
      items,
    });
  } else {
    res.render("empty");
  }
});

app.get("/get/:fileName", (req, res) => {
  try {
    let fileName = req.params.fileName;
    if (fileName) {
      let path = folder + fileName;
      res.download(path);
    } else {
      res.render("index", { items });
    }
  } catch {
    res.render("404");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`listening on port ${PORT}`);
});
