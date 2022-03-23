import fetchJson from "../lib/fetchJson";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Updates.module.css";
import { marked } from "marked";
import Comments from "../components/Comments";

const Updates = ({ updates }) => {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.h1}>Обновления</h1>
          <section>
            {updates.map((update) => (
              <article className={styles.article} key={update.id}>
                <div
                  className={styles.update_text}
                  dangerouslySetInnerHTML={{ __html: update.text }}
                ></div>
                <p className={styles.update_author}>
                  <span style={{ marginRight: "1rem" }}>
                    {update.date.split("T")[0].replaceAll("-", ".")},{" "}
                    {update.date.split("T")[1].split(".")[0]}
                  </span>
                  <span>Автор: {update.author}</span>
                </p>
                <Comments updateId={update.id} comments={update.comments} />
                <hr />
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { Commentary, User } = require("../models");
  const response = await fetchJson(
    "https://gitlab.informatics.ru/api/v4/projects/5102/repository/tree?ref=Updates",
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": "UCoDynxxscwQ66KadnfG",
      },
    }
  );
  const files = response.map((file) => file.name);
  const updates = await Promise.all(
    files.map(async (fileName) => {
      const info = await fetchJson(
        `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${fileName}/blame?ref=Updates`,
        {
          method: "GET",
          headers: {
            "PRIVATE-TOKEN": "UCoDynxxscwQ66KadnfG",
          },
        }
      );
      const response = await fetch(
        `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${fileName}/raw?ref=Updates`,
        {
          method: "GET",
          headers: {
            "PRIVATE-TOKEN": "UCoDynxxscwQ66KadnfG",
          },
        }
      );
      const rawText = await response.text();
      const text = marked.parse(rawText);
      const comments = JSON.stringify(
        await Commentary.findAll({
          where: {
            updateId: info[0].commit.id,
          },
          include: [{ model: User, as: "user" }],
          raw: true,
          nest: true,
        })
      );
      return {
        id: info[0].commit.id,
        author: info[0].commit.committer_name,
        date: info[0].commit.committed_date,
        text: text,
        comments: JSON.parse(comments),
      };
    })
  );
  return {
    props: { updates },
  };
}

export default Updates;