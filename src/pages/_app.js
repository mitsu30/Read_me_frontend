import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from "@mui/material";
import Header from '../components/header'; 
import { NextSeo } from 'next-seo';

const theme = createTheme({
  typography: {
    fontFamily: ["Yomogi"].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextSeo
        title="りーどみー" // 全てのページのデフォルトタイトルを設定します。
      />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
