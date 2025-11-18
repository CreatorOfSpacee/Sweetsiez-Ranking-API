const express = require("express");
const noblox = require("noblox.js");
require("dotenv").config();

const app = express();
app.use(express.json());

async function start() {
  try {
    await noblox.setCookie(process.env.COOKIE);
    console.log("Logged into Roblox successfully!");
  } catch (err) {
    console.error("Failed to login:", err);
  }
}
start();

// Rank a user
app.post("/rank", async (req, res) => {
  try {
    const { userId, rank } = req.body;

    if (!userId || !rank) {
      return res.json({ success: false, error: "Missing userId or rank" });
    }

    const result = await noblox.setRank({
      group: Number(process.env.GROUP_ID),
      target: Number(userId),
      rank: Number(rank)
    });

    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Promote a user
app.post("/promote", async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await noblox.promote(
      Number(process.env.GROUP_ID),
      Number(userId)
    );

    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Demote a user
app.post("/demote", async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await noblox.demote(
      Number(process.env.GROUP_ID),
      Number(userId)
    );

    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Sweetsiez Ranking API is online!");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
