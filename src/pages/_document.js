import { Html, Head, Main, NextScript } from "next/document";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function Document() {
  return (
    <Html>
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
        }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
