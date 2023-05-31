import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{minHeight: "100vh"}}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Yomogi&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{
          backgroundImage: "url(/background.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundColor: "#ffffff", // fallback color
          minHeight: "100vh"
        }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
