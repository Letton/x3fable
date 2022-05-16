import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import screenshot_1 from "../public/img/screenshot_1.png";
import screenshot_2 from "../public/img/screenshot_2.png";
import screenshot_3 from "../public/img/screenshot_3.png";
import fetchJson from "../lib/fetchJson";
import ModalImage from "../components/ModalImage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import Link from "next/link";
import { useState, useEffect } from "react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";

import Footer from "../components/Footer";
import Loader from "../components/Lodaer";

export default function Home() {
  const [update, setUpdate] = useState(null);

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchJson("/api/get-update");
      setUpdate(response.update);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section className={styles.first_section}>
            <h2 className={styles.title}>X3-FABLE - Крутое средневековье!</h2>
            <p className={styles.description}>
              Добро пожаловать на сайт, посвященный игре X3fable! Следите за
              обновлениями, оставляйте свои комментарии и узнавайте больше о
              нескучном средневековье. Вы ещё не знаете о нас? Об игре в
              нескольких словах: Вы оказываетесь в средневековье, чтобы выжить,
              Вам придется приложить усилия. Убивайте монстров, прокачивайте
              свои умения и наслаждайтесь процессом, а авторское музыкальное
              сопровождение поможет почувствовать атмосферу нашей вселенной.
            </p>
          </section>
          <hr />
          <ModalImage
            src={screenshot_1}
            alt="Screenshot"
            width={1920}
            height={1080}
            layout="fill"
            unoptimized
            placeholder="blur"
            active={active1}
            setActive={setActive1}
          ></ModalImage>
          <ModalImage
            src={screenshot_2}
            alt="Screenshot"
            width={1920}
            height={1080}
            layout="fill"
            unoptimized
            placeholder="blur"
            active={active2}
            setActive={setActive2}
          ></ModalImage>
          <ModalImage
            src={screenshot_3}
            alt="Screenshot"
            width={1920}
            height={1080}
            layout="fill"
            unoptimized
            placeholder="blur"
            active={active3}
            setActive={setActive3}
          ></ModalImage>
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
                  onClick={() => setActive1(true)}
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
                  onClick={() => setActive2(true)}
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
                  onClick={() => setActive3(true)}
                ></Image>
              </SwiperSlide>
            </Swiper>
          </section>
          <hr />
          <section>
            <h2 className={styles.title}>Последнее обновление</h2>
            {!update ? (
              <Loader />
            ) : (
              <>
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
                <Link href="/updates">
                  <a className={styles.alt_link}>Смотреть все обновления</a>
                </Link>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
