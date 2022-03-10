import styles from "../styles/Home.module.css";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { useState } from "react/cjs/react.development";
import fetchJson from "../lib/fetchJSON";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(login);
    await fetchJson("/api/login", {
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
        <div className="container">
          <form>
            <input type="text" onChange={(e) => setLogin(e.target.value)} />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={(e) => loginHandler(e)}>
              Зайти
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
