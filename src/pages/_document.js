import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ minHeight: "100vh" }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Yomogi&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E8T8K5F4TS"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E8T8K5F4TS');
        `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body style={{
          backgroundImage: "url(/background.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundColor: "#ffffff", 
          minHeight: "100vh"
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
