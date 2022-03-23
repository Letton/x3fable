import jwt from "jsonwebtoken";
import { Commentary } from "../../models";

export default async function handler(req, res) {
  const { commentText, updateId } = req.body;
  if (!commentText || !updateId) {
    return res.status(400).json({
      status: "error",
      message: "Пустой комментарий",
    });
  }
  let user = null;
  try {
    user = jwt.verify(req.cookies.token, process.env.SECRET);
  } catch {
    return res.status(400).json({
      status: "error",
      message: "Авторизируйтесь чтобы добавить комментарий",
    });
  }
  const commentCandidate = await Commentary.findOne({
    where: {
      userId: user.id,
    },
    order: [["updatedAt", "DESC"]],
  });
  if (
    commentCandidate &&
    commentCandidate.updatedAt.getTime() + 60 * 1000 > Date.now()
  ) {
    return res.status(400).json({
      status: "error",
      message: "Вы можете осталять комментарий раз в минуту",
    });
  }
  const comment = await Commentary.create({
    text: commentText,
    updateId: updateId,
    userId: user.id,
  });
  return res.status(200).json({ status: "ok" });
}
