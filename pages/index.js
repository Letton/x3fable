import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "./components/Layout";
import Header from "./components/Header";
import screenshot_1 from "../public/img/screenshot_1.jpg";
import screenshot_2 from "../public/img/screenshot_2.jpg";
import screenshot_3 from "../public/img/screenshot_3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";
import Footer from "./components/Footer";

export default function Home() {
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
            <article className={styles.update_article}>
              <h2 className={styles.update_title}>Обновление 1.0.2</h2>
              <p className={styles.update_descrition}>
                *здесь описание обновления, которое происходит. это может быть
                развёрнуто, а может быть кратенько. лучше всё расписать по
                пунктам*
              </p>
              <p className={styles.update_author}>
                30.02.2032, 23:51. Автор: *admin nickname*
              </p>
            </article>
            <article className={styles.update_article}>
              <h2 className={styles.update_title}>Обновление 1.0.2</h2>
              <p className={styles.update_descrition}>
                *здесь описание обновления, которое происходит. это может быть
                развёрнуто, а может быть кратенько. лучше всё расписать по
                пунктам*
              </p>
              <p className={styles.update_author}>
                30.02.2032, 23:51. Автор: *admin nickname*
              </p>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
