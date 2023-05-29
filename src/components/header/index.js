import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Box } from '@mui/material';
import { styled } from '@mui/system';

const HeaderButton = styled(Button)({
  color: '#000',
  marginRight: '20px',
});

const HeaderContainer = styled(AppBar)({
  backgroundColor: '#FFD5EC',
  zIndex: 1,
  position: 'relative',
});

export default function Header() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
    <HeaderContainer position="static">
      <Toolbar style={{ justifyContent: 'flex-end' }}>
        <HeaderButton variant="text" onClick={() => handleOpen('コミュニティ')}>
          <Typography variant="body1">コミュニティ</Typography>
        </HeaderButton>
        <HeaderButton variant="text" onClick={() => handleOpen('ログイン')}>
          <Typography variant="body1">ログイン</Typography>
        </HeaderButton>

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
            <p id="modal-description">準備中です！</p>
          </Box>
        </Modal>
      </Toolbar>
    </HeaderContainer>
  );
}
