import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#35230d" height={3} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
