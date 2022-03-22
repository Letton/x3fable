import Head from "next/head";

export default function Layout({ children, title = "X3Fable" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="X3Fable - Some Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
