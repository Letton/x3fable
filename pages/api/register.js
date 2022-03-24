import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User, PendingUser } from "../../models";
import bcrypt from "bcrypt";
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
import { sendConfirmationEmail } from "../../lib/mailer";

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export default async function handler(req, res) {
  const { login, email, password } = req.body;
  if (!login || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Невалидный данные",
    });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({
      status: "error",
      message: "Невалидный email",
    });
  }
  if (password.length <= 8) {
    return res.status(400).json({
      status: "error",
      message: "Пароль должен быть длиннее 8 символов",
    });
  }
  const userCandidate = await User.findOne({
    where: { [Op.or]: [{ email: email }, { login: login }] },
  });
  if (userCandidate) {
    return res.status(400).json({
      status: "error",
      message: "Пользователь с таким логином или почтой уже существует",
    });
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const token = jwt.sign(
    { login: login, email, password: hashPassword },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  try {
    await sendConfirmationEmail(email, token);
  } catch {
    return res.status(400).json({
      status: "error",
      message: "Не удалось отправить письмо на вашу почту",
    });
  }
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, { path: "/", maxAge: 60 * 60 * 24 })
  );
  res.status(200).json({ status: "ok" });
}
