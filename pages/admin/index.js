import fetchJson from "../../lib/fetchJSON";
import Link from "next/link";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Admin.module.css";
import jwt from "jsonwebtoken";

const index = ({ errorCode }) => {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.wrapper}>
            <Link href="/admin/add-update" passHref>
              <button className={styles.button}>Добавить</button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const response = await fetch(
    "https://gitlab.informatics.ru/2021-2022/mytischi/s101/x3fable/-/raw/main/README.md",
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: "token suWqBrSkSF2JkHEFJnKc",
      },
    }
  );
  console.log(response);
  fetch("");
  try {
    const user = jwt.verify(req.cookies.token, process.env.SECRET);
    if (user.role !== "admin") {
      throw Error;
    }
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
}

export default index;
