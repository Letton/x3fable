import fetchJson from "../../lib/fetchJSON";
import jwt from "jsonwebtoken";
import Error from "next/error";

const index = ({ errorCode }) => {
  const testHandler = async () => {
    await fetchJson("/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };
  if (errorCode) {
    return <Error statusCode={errorCode}></Error>;
  }
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
  let decoded = "";
  let errorCode = 500;
  try {
    decoded = jwt.verify(ctx.req.cookies.token, process.env.SECRET);
  } catch {
    errorCode;
  }
  console.log(decoded);
  return {
    props: { errorCode },
  };
}

export default index;
