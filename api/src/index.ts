import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { getConnection, initConnection } from "./dbConnection";
import { RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(json());

app.get("/check", async (_, res) => {
  res.status(200);
  res.json({ status: "OK" });
});

app.post("/login", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const connection = getConnection();

    const [usersCheck] = await connection.execute(
      `SELECT nickname, password
    FROM users
    WHERE nickname = ?`,
      [`${nickname}`]
    );

    const [existingUser] = usersCheck as RowDataPacket[];

    if (!existingUser) {
      return res.status(401).json({ error: "Nickname doesn't exist!" });
    }

    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Internal server error while comparing passwords" });
      } else if (result) {
        const token = jwt.sign({ nickname }, process.env.SECRET_KEY as string, {
          expiresIn: "1h",
        });

        return res.status(200).send({ token: token });
      } else {
        return res.status(401).json({ error: "Password incorrect" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const connection = getConnection();

    const [usersCheck] = await connection.execute(
      `SELECT nickname
    FROM users
    WHERE nickname = ?`,
      [`${nickname}`]
    );

    const [existingUser] = usersCheck as RowDataPacket[];

    if (existingUser) {
      return res.status(409).json({ error: "Nickname already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      `INSERT INTO users (nickname, password)
        VALUES (?, ?)`,
      [`${nickname}`, `${hashedPassword}`]
    );

    const token = jwt.sign({ nickname }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return res.status(200).send({ token: token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

async function init() {
  await initConnection();
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

init();
