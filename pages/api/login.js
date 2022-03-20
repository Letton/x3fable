import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  console.log(req.body);
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({
      status: "error",
      message: "Невалидные данные",
    });
  }
  const user = await User.findOne({
    where: { login },
  });
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      status: "error",
      message: "Неверный логин или пароль",
    });
  }
  const token = jwt.sign(
    { login: user.login, role: user.role },
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, { path: "/", maxAge: 60 * 60 * 24 })
  );
  res.status(200).json({ status: "ok" });
}
