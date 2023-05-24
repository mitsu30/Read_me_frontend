import '../../styles/globals.css'
import {ThemeProvider} from '@mui/material/styles';
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Yomogi"].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
