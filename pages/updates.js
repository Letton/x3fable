import fetchJson from "../lib/fetchJson";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Updates.module.css";
import { marked } from "marked";
import Comments from "../components/Comments";
import prisma from "../lib/prisma";
import redis from "../lib/redis";
const Updates = ({ updates }) => {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section>
            <h1 className={styles.h1}>Обновления</h1>
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
  let updates = await redis.get("updates");
  if (updates) {
    updates = JSON.parse(updates);
    updates = await Promise.all(
      updates.map(async (update) => {
        const comments = await prisma.commentary.findMany({
          where: {
            updateId: update.id,
          },
          include: {
            user: {
              select: {
                login: true,
              },
            },
          },
        });
        return {
          ...update,
          comments: comments.map((comment) => {
            return {
              ...comment,
              createdAt: comment.createdAt.toString(),
              updatedAt: comment.updatedAt.toString(),
            };
          }),
        };
      })
    );
    return {
      props: { updates },
    };
  }
  const response = await fetchJson(
    "https://gitlab.informatics.ru/api/v4/projects/5102/repository/tree?ref=Updates",
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
      },
    }
  );
  const files = response.reverse();
  updates = await Promise.all(
    files.map(async ({ id, name }) => {
      const info = await fetchJson(
        `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${name}/blame?ref=Updates`,
        {
          method: "GET",
          headers: {
            "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
          },
        }
      );
      const response = await fetch(
        `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${name}/raw?ref=Updates`,
        {
          method: "GET",
          headers: {
            "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
          },
        }
      );
      const rawText = await response.text();
      const text = marked.parse(rawText);
      return {
        id: id,
        author: info[info.length - 1].commit.committer_name,
        date: info[info.length - 1].commit.committed_date,
        text: text,
      };
    })
  );
  redis.setex("updates", 60 * 60, JSON.stringify(updates));
  updates = await Promise.all(
    updates.map(async (update) => {
      const comments = await prisma.commentary.findMany({
        where: {
          updateId: update.id,
        },
        include: {
          user: {
            select: {
              login: true,
            },
          },
        },
      });
      return {
        ...update,
        comments: comments.map((comment) => {
          return {
            ...comment,
            createdAt: comment.createdAt.toString(),
            updatedAt: comment.updatedAt.toString(),
          };
        }),
      };
    })
  );
  return {
    props: { updates },
  };
}

export default Updates;
