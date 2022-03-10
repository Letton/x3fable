import { serialize } from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "token_cookie_value", { path: "/" })
  );
  res.status(200).json({ name: "John Doe" });
}
