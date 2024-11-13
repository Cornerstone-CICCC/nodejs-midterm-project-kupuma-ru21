import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import { compareHash, hashed } from "../utils/hash.util";

const addUser = async (
  req: Request<{}, {}, Pick<User, "email" | "password">>,
  res: Response
) => {
  const { email, password } = req.body;
  const hashedPassword = await hashed(password);
  const user = userModel.createUser({
    email,
    password: hashedPassword,
  });
  res.json(user);
};

const loginUser = async (
  req: Request<{}, {}, Pick<User, "email" | "password">>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = userModel.findByEmail(email);
  if (!user) {
    res.status(404).send({ token: "", error: "User not found" });
    return;
  }
  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    res.status(401).send({ token: "", error: "Invalid credentials" });
    return;
  }

  // REF: https://qiita.com/knaot0/items/8427918564400968bd2b
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { sub: user.id, iat: Math.floor(Date.now() / 1000) };

  const encodeBase64 = (json: Record<string, string | number>) => {
    const jsonStr = JSON.stringify(json);
    // Buffer creates a string which can take an optional encoding parameter to specify how to encode the string.
    const jsonB64 = Buffer.from(jsonStr).toString("base64");
    const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, "");
    return jsonB64NoPadding;
  };
  // TODO: Implement the encodeHMAC function
  const unsignedToken = `${encodeBase64(header)}.${encodeBase64(payload)}`;
  res.status(200).send({ token: "token", error: "" });
};

export default { addUser, loginUser };
