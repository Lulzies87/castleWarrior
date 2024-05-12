import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { getConnection, initConnection } from "./dbConnection";
import { RowDataPacket } from "mysql2/promise";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PlayerData } from "./PlayerData.model";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/playerData", async (req, res) => {
  try {
    const token = req.signedCookies.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as PlayerData;
    const { nickname } = decode;
    const playerData = await getPlayerData(nickname);

    res.status(200).json(playerData);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: "Failed to retrieve player data" });
    }
  }
});

async function getPlayerData(nickname: string) {
  const connection = getConnection();

  const [data] = await connection.execute(
    `SELECT nickname, hp, score, highscore
    FROM castleWarrior.playerData
    WHERE nickname = ?`,
    [nickname]
  );

  const [playerData] = data as RowDataPacket[];

  return playerData;
}

app.post("/login", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const connection = getConnection();

    const [usersCheck] = await connection.execute(
      `SELECT nickname, password
    FROM castleWarrior.users
    WHERE nickname = ?`,
      [`${nickname}`]
    );

    const [existingUser] = usersCheck as RowDataPacket[];

    if (!existingUser) {
      return res.status(401).json({ error: "Nickname doesn't exist!" });
    }

    const isMatch = bcrypt.compareSync(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Password incorrect" });
    } else {
      const token = jwt.sign({ nickname }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      const cookieSettings = {
        maxAge: 3600000,
        signed: true,
      };

      return res
        .status(200)
        .cookie("token", token, cookieSettings)
        .json({ res: "Cookie set!" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const connection = getConnection();

    const [usersCheck] = await connection.execute(
      `
      SELECT nickname
      FROM castleWarrior.users
      WHERE nickname = ?
    `,
      [`${nickname}`]
    );

    const [existingUser] = usersCheck as RowDataPacket[];

    if (existingUser) {
      return res.status(409).json({ error: "Nickname already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      `
        INSERT INTO castleWarrior.users (nickname, password)
        VALUES (?, ?)
      `,
      [`${nickname}`, `${hashedPassword}`]
    );

    await connection.execute(
      `
        INSERT INTO castleWarrior.playerData (nickname, hp, score, highscore)
        VALUES(?, ?, ?, ?)
      `,
      [`${nickname}`, "100", "0", "0"]
    );

    const token = jwt.sign({ nickname }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const cookieSettings = {
      maxAge: 3600000,
      signed: true,
    };

    return res
      .status(200)
      .cookie("token", token, cookieSettings)
      .json({ res: "Cookie set!" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

async function init() {
  await initConnection();
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

init();
