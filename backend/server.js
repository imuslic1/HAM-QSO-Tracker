const express = require("express");
const cors = require("cors");
const { sequelize, QSO } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test DB connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB error:", err));

// Sync models (auto create table if missing)
sequelize.sync();

// Get last QSO by callsign
app.get("/qso/:callsign", async (req, res) => {
  try {
    const qso = await QSO.findOne({
      where: { callsign: req.params.callsign },
      order: [["created_at", "DESC"]]
    });
    res.json(qso || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add new QSO
app.post("/qso", async (req, res) => {
  try {
    const qso = await QSO.create(req.body);
    res.json(qso);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
