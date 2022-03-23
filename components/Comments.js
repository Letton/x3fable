import styles from "../styles/Comments.module.css";
import fetchJson from "../lib/fetchJson";
import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "./Modal";

export default function Comments({ updateId, comments }) {
  const router = useRouter();

  const [commentText, setCommentText] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({ title: null, text: null });

  const commentHandler = async (e) => {
    e.preventDefault();
    const response = await fetchJson("/api/add-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commentText,
        updateId,
      }),
    });
    if (response.status == "ok") {
      router.push("/updates");
      return;
    }
    if (response.status == "error") {
      setModalActive(true);
      setModalContent({
        title: "Ошибка",
        text: response.message,
      });
      return;
    }
    setModalActive(true);
    setModalContent({
      title: "Ошибка",
      text: "Неизвестная ошибка",
    });
    return;
  };

  return (
    <>
      <h2 className={styles.commentsTitle}>Комментарии: </h2>
      <div className={styles.commentsWrapper}>
        {!!comments.length && (
          <div className={styles.comments}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                {comment.user.login}: {comment.text}
              </div>
            ))}
          </div>
        )}
        <div className={styles.submitWrapper}>
          <form onSubmit={(e) => commentHandler(e)} className={styles.form}>
            <label htmlFor={`add${updateId}`} className={styles.label}>
              Сообщение:
            </label>
            <input
              type="text"
              id={`add${updateId}`}
              onChange={(e) => setCommentText(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Отправить
            </button>
          </form>
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        title={modalContent.title}
        text={modalContent.text}
      />
    </>
  );
}
