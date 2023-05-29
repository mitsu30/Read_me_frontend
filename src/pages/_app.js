import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from "@mui/material";
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';

const theme = createTheme({
  typography: {
    fontFamily: ["Yomogi"].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <Image
          src="/background.png"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          quality={100}
          zIndex={-1}
        />
        <div style={{position: 'relative', zIndex: 0}}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
