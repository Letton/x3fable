import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import styles from "../../styles/Account.module.css";

export default function Activate() {
  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className={styles.form_wrapper}></div>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const { User, PendingUser } = require("../../models");
  const { hash } = params;
  const pending_user = await PendingUser.findOne({ where: { hash } });
  if (pending_user) console.log(1);
  return {
    props: {
      data: 123,
    },
  };
}
