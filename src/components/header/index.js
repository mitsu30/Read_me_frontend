import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleModalOpen = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AppBar position="static" style={{backgroundColor: '#FFEEFF', color: '#000000', zIndex: 2}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Link href="/" >
              <img 
                src="/logo.png" 
                alt="ロゴ" 
                style={{ 
                  width: '150px', 
                  height: 'auto', 
                  transition: '0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button onClick={() => handleModalOpen('コミュニティ', '準備中です！')}>
            <ListItemText primary="コミュニティ" />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen('ログイン', '準備中です！')}>
            <ListItemText primary="ログイン" />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen('利用規約', '準備中です！')}>
            <ListItemText primary="利用規約" />
          </ListItem>
          <ListItem button component="a" href="https://kiyac.app/privacypolicy/8LceFAKn3LueySAB3tNs" target="_blank">
            <ListItemText primary="プライバシーポリシー" />
          </ListItem>
          <ListItem button component="a" href="https://twitter.com/readmee_profile" target="_blank">
            <ListItemText primary="お問い合わせ" />
          </ListItem>
          <ListItem>
            <ListItemText primary="© 2023 りーどみー" />
          </ListItem>
        </List>
      </Drawer>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h4" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-description" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
