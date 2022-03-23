import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/About.module.css";

const Updates = ({ updates }) => {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Об игре:</h1>
          <p className={styles.description}>
            *здесь описание игры, о чём она, в чём суть и прочее. всякая инфа в
            том числе. здесь важно заинтересовать пользователя сайта, но не
            рассказывать весь сюжет. нужно будет написать что-то вроде “вы
            оказались в средневековье, в обличии храброго рыцаря” и бла-бла-бла*
          </p>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};
export default Updates;
