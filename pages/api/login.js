import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = jwt.sign({ admin: true }, process.env.SECRET);
  res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));
  res.status(200).json({ name: "John Doe" });
}
