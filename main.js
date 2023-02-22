import express from "express";
import * as fs from "fs";

const folder = "./files/";

let files = fs.readdirSync(folder);
let items = [];
for (let path of files) {
  items.push({ url: path });
}

console.log(files);

const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));
app.get("/", (req, res) => {
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

app.listen(8001, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listen on port 8001");
});
