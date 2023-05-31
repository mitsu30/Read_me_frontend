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
import Link from 'next/link';  // 追加

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleModalOpen = (content) => {
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
          <Box sx={{ flexGrow: 1 }} />  {/* 追加 */}
          <Link href="/" >
              <img src="/logo.png" alt="ロゴ" style={{ width: '150px', height: 'auto' }} />
          </Link>
        </Toolbar>
      </AppBar>


      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button onClick={() => handleModalOpen('コミュニティ')}>
            <ListItemText primary="コミュニティ" />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen('ログイン')}>
            <ListItemText primary="ログイン" />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen('利用規約')}>
            <ListItemText primary="利用規約" />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen('プライバシーポリシー')}>
            <ListItemText primary="プライバシーポリシー" />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen('お問い合わせ')}>
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
          <Typography id="modal-title" variant="h6" component="h2">
            {modalContent}
          </Typography>
          <Typography id="modal-description" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            準備中です！
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
