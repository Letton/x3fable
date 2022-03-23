import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import screenshot_1 from "../public/img/screenshot_1.jpg";
import screenshot_2 from "../public/img/screenshot_2.jpg";
import screenshot_3 from "../public/img/screenshot_3.jpg";
import fetchJson from "../lib/fetchJson";
import { marked } from "marked";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Link from "next/link";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";
import Footer from "../components/Footer";

export default function Home({ updates }) {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section className={styles.first_section}>
            <h2 className={styles.title}>X3-FABLE - Крутое средневековье!</h2>
            <p className={styles.description}>
              *здесь описание игры, о чём она, в чём суть и прочее. всякая инфа
              в том числе. здесь важно заинтересовать пользователя сайта, но не
              рассказывать весь сюжет. нужно будет написать что-то вроде “вы
              оказались в средневековье, в обличии храброго рыцаря” и
              бла-бла-бла*
            </p>
          </section>
          <hr />
          <section className="">
            <h2 className={styles.title}>Скриншоты</h2>
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              scrollbar={{ draggable: true }}
            >
              <SwiperSlide>
                <Image
                  src={screenshot_1}
                  alt="Screenshot"
                  width={600}
                  height={400}
                  layout="responsive"
                  unoptimized
                  placeholder="blur"
                ></Image>
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={screenshot_2}
                  alt="Screenshot"
                  width={600}
                  height={400}
                  layout="responsive"
                  unoptimized
                  placeholder="blur"
                ></Image>
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={screenshot_3}
                  alt="Screenshot"
                  width={600}
                  height={400}
                  layout="responsive"
                  unoptimized
                  placeholder="blur"
                ></Image>
              </SwiperSlide>
            </Swiper>
          </section>
          <hr />
          <section>
            <h2 className={styles.title}>Обновления</h2>
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
              </article>
            ))}
            <Link href="/updates">
              <a className={styles.alt_link}>Смотреть все обновления</a>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetchJson(
    "https://gitlab.informatics.ru/api/v4/projects/5102/repository/tree?ref=Updates",
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": "UCoDynxxscwQ66KadnfG",
      },
    }
  );
  const files = response.map((file) => file.name).slice(0, 2);
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
      return {
        id: info[0].commit.id,
        author: info[0].commit.committer_name,
        date: info[0].commit.committed_date,
        text: text,
      };
    })
  );
  return {
    props: { updates },
  };
}
