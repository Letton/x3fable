import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import styles from "../../styles/Account.module.css";
import fetchJson from "../../lib/fetchJSON";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(login);
    console.log(password);
    const res = await fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    if (res.status === "ok") {
      router.push("/account");
    }
  };

  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className={styles.form_wrapper}>
          <form onSubmit={registerHandler}>
            <label htmlFor="login" className={styles.label}>
              Логин
            </label>
            <input
              type="text"
              className={styles.input}
              id="login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              type="password"
              className={styles.input}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button}>
              Войти
            </button>
            <Link href="/account/register">
              <a className={styles.alt_link}>Зарегистрироваться</a>
            </Link>
          </form>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
