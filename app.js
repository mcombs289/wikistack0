const express = require("express");
const app = express();
const morgan = require("morgan");
const layout = require("./views/layout");
const { db, Page, User } = require("./models");

app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static("public"));

const init = async () => {
  try {
    await db.sync({ force: true });
    await Page.sync();
    await User.sync();
    app.listen(2000);
  } catch (err) {
    console.error(err);
  }
};

app.get("/", (req, res) => {
  const html = layout("hi");
  res.send(html);
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

init();
