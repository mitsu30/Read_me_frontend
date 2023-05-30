import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from "@mui/material";
import Header from '../components/header'; // 新しいヘッダーをインポートします。

const theme = createTheme({
  typography: {
    fontFamily: ["Yomogi"].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'relative', height: '100vh', overflowX: 'hidden' }}>
        <Header /> {/* 新しいヘッダーを使用します。 */}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
export default MyApp;
