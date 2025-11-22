const express = require("express");
const axios = require("axios");
const app = express();

// GET /event/:id -> Proxy do SofaScore
app.get("/event/:id", async (req, res) => {
  const eventId = req.params.id;
  const url = `https://api.sofascore.com/api/v1/event/${eventId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.sofascore.com/",
        "Origin": "https://www.sofascore.com",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9"
      },
      responseType: "json",
      timeout: 10000
    });

    res.json(response.data);
  } catch (err) {
    console.error("Erro ao buscar SofaScore:", err?.message || err);
    res
      .status(502)
      .json({ error: "Falha ao conectar com SofaScore.", details: err?.message });
  }
});

// Rota raiz opcional
app.get("/", (req, res) => {
  res.json({
    status: "LaBenditaCopa proxy",
    info: "Use /event/:id para buscar JSON do SofaScore"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy rodando na porta " + PORT));
