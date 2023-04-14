import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  // $(document).ready(function () {
  //   $(".css-transitions-only-after-page-load").each(function (index: number, element) {
  //       setTimeout(function () { $(element).removeClass("css-transitions-only-after-page-load") }, 10);
  //   });
// });
// debugger;
  return (
    <>
      <Head>
          <title>Lunch and Learn</title>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
