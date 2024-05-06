import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { initConnection } from "./dbConnection";

const app = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));


app.get("/check", async (_, res) => {
  res.status(200);
  res.json({ status: "OK" });
});

app.post("/login", (req, res) => {
  const { nickname, password } = req.body;

  if (nickname !== "lulzies" || password !== "1234567") {
      res.status(401);
      res.send({
          error: "Username or password doesn't match."
      });

      return;
  }

  res.status(200);
  console.log("OK!");
  res.send(JSON.stringify("some secret value")); // Send a valid JWT
});

async function init() {
  await initConnection();
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

init();
