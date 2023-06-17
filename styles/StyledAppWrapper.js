import { styled } from '@mui/system';

export default styled('div')({
  backgroundImage: "url(/background.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "100% 100%", // Changed to scale with width and height
  backgroundColor: "#ffffff", // fallback color
  minHeight: "100vh"
});
