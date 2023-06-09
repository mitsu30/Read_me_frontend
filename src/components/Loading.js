import { styled } from '@mui/system';

const LoadingDiv = styled('div')({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  color: '#FF773E',
  fontSize: '1.5em',
  fontWeight: 'bold',
  animation: 'blinkingText 1.2s infinite',
  '@keyframes blinkingText': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

export default function Loading ({ children }) {
  return (
    <LoadingDiv>
      {children}
    </LoadingDiv>
  )
}
