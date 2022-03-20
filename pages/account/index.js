import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import styles from "../../styles/Account.module.css";
import fetchJson from "../../lib/fetchJSON";
import { useState } from "react";
import jwt from "jsonwebtoken";

export default function Account({ data }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(login);
    console.log(password);
    await fetchJson("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      }),
    });
  };

  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className={styles.form_wrapper}>{data.login}</div>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  let data = null;
  try {
    const token = ctx.req.cookies.token;
    const data = jwt.verify(token, process.env.SECRET);
    return { props: { data } };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
    };
  }
}
