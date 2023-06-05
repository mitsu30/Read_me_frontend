import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from "@mui/material";
import Header from '../components/header'; 
import { NextSeo } from 'next-seo';
import { AuthContextProvider } from "../context/AuthContext";


const theme = createTheme({
  typography: {
    fontFamily: ["Yomogi"].join(","),
    fontWeightBold: 700,
    h1: {
      color: '#FF773E',
      fontWeight: 'bold',
    },
    h2: {
      color: '#FF773E',
      fontWeight: 'bold',
    },
    h3: {
      color: '#FF773E',
      fontWeight: 'bold',
    },
    h4: {
      color: '#111111',
      fontWeight: 'bold',
    },
    h5: {
      color: '#FF773E',
      fontWeight: 'bold',
    },
    h6: {
      color: '#FF773E',
      fontWeight: 'bold',
    },
    body2: {
      color: '#FF773E',
      fontWeight: 'bold',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <div style={{
      backgroundImage: "url(/background.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "100% 100%", // Changed to scale with width and height
      backgroundColor: "#ffffff", // fallback color
      minHeight: "100vh"
    }}>
      <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextSeo
          title="りーどみー" // 全てのページのデフォルトタイトルを設定します。
        />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
      </AuthContextProvider>
    </div>
  );
}
export default MyApp;
