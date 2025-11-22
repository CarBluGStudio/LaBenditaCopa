const express = require("express");
const axios = require("axios");
const app = express();

// Route: GET /event/:id -> proxies SofaScore event JSON for given :id
app.get("/event/:id", async (req, res) => {
  const eventId = req.params.id;
  const url = `https://api.sofascore.com/api/v1/event/${eventId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.sofascore.com/",
        "Origin": "https://www.sofascore.com"
      },
      responseType: "json",
      timeout: 10000
    });
    res.json(response.data);
  } catch (err) {
    console.error("Erro ao buscar SofaScore:", err && err.message ? err.message : err);
    res.status(502).json({ error: "Falha ao conectar com SofaScore.", details: err && err.message });
  }
});

// Optional root route for quick test
app.get("/", (req, res) => {
  res.json({ status: "LaBenditaCopa proxy", info: "Use /event/:id to fetch SofaScore JSON" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy rodando na porta " + PORT));
