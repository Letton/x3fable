import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import styles from "../../styles/Account.module.css";
import fetchJson from "../../lib/fetchJSON";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function Account({ data }) {
  const router = useRouter();

  const logoutHandler = async () => {
    const res = await fetchJson("/api/logout", {
      method: "GET",
    });
    if (res.status === "ok") {
      router.push("/account/login");
    }
  };
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className={styles.form_wrapper}>
          <div className={styles.account_data}>
            <div>Login: {data.login}</div>
            <div>Email: {data.email}</div>
          </div>
          <button className={styles.button} onClick={logoutHandler}>
            Выйти
          </button>
        </div>
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
