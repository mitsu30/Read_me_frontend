import { SnackbarProvider } from 'notistack';
import { styled } from '@mui/system';

export default styled(SnackbarProvider)({
  '& .MuiSnackbar-root': {
    backgroundColor: '#FF773E',
  },
});
