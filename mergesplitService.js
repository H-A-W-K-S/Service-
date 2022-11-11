const pgp = require("pg-promise")();
const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello mergeSplit server is running").end();
});

router.get("/scores", readScores);

function readScores(req, res, next) {
  db.many(
    "SELECT Player.ID, name, score FROM Player, Game, PlayerGame WHERE Player.ID = PlayerGame.PlayerID AND Game.ID = PlayerGame.gameInstanceID ORDER BY score DESC"
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}
