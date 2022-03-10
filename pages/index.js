import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "./components/Layout";
import Header from "./components/Header";

export default function Home() {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container"></div>
      </main>
    </Layout>
  );
}
