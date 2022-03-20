import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import styles from "../../styles/Account.module.css";

export default function Activate({ message }) {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className={styles.form_wrapper}>{message}</div>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { User } = require("../../models");
  const jwt = require("jsonwebtoken");
  const { token } = params;
  try {
    const data = jwt.verify(token, process.env.SECRET);
    await User.create({
      login: data.login,
      email: data.email,
      password: data.password,
    });
  } catch {
    return {
      props: {
        message: "Неверный token",
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/account/login",
    },
  };
}
