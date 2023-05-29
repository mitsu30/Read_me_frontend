import React, { useState } from 'react';
import { Typography, Box, Modal } from '@mui/material';
import { styled } from '@mui/system';

const FooterText = styled(Typography)({
  marginRight: '20px',
  cursor: 'pointer',
  color: '#000',
});

const FooterContainer = styled('footer')({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  backgroundColor: '#FFD5EC',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '20px',
});

export default function Footer() {
  const [modalContent, setModalContent] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
    <FooterContainer>
      <FooterText variant="body1" onClick={() => handleOpen('利用規約')}>利用規約</FooterText>
      <FooterText variant="body1" onClick={() => handleOpen('プライバシーポリシー')}>プライバシーポリシー</FooterText>
      <FooterText variant="body1" onClick={() => handleOpen('お問い合わせ')}>お問い合わせ</FooterText>
      <Typography variant="body1" style={{marginRight: '10px'}}>© 2023 りーどみー</Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          backgroundColor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          maxWidth: '500px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <h2 id="modal-title">{modalContent}</h2>
          <p id="modal-description">文字列</p>
        </Box>
      </Modal>
    </FooterContainer>
  );
}
