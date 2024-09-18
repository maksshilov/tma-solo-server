const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const CHECK_LIST_PATH = path.resolve(__dirname, "db", "checklist.json");

const router = express.Router();

router.get("/check-list", async (req, res) => {
  try {
    fs.readFile(CHECK_LIST_PATH, "utf-8", (err, data) => {
      if (err) return;
      res.json(JSON.parse(data));
    });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/check-list", async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 4);

    fs.writeFile(CHECK_LIST_PATH, data, (error) => {
      if (error) return;
    });

    res.json("Data written successfully to disk");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

const app = express();
app.use(express.json({ extendet: true }));
app.use(cors());
app.use("/api", router);
app.use("/", express.static(path.join(__dirname, "db")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

async function start() {
  try {
    app.listen(3000, () => console.log(`Server starts at port ${5000}`));
  } catch (error) {
    process.exit();
  }
}

start();
