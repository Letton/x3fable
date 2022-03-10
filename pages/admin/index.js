import fetchJson from "../../lib/fetchJSON";

const index = () => {
  const testHandler = async () => {
    await fetchJson("/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  return <div onClick={testHandler}>Enter</div>;
};

export async function getServerSideProps(ctx) {
  if (!ctx.req.cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default index;
