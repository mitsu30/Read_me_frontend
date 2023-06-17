import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext'; 
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Link from 'next/link';
import AppDrawer from './AppDrawer'; 
import InformationModal from './InformationModal'; 

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const router = useRouter();  

  const { currentUser, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar(); 

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

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogoutClick = () => {
    logout();
    enqueueSnackbar('ログアウトに成功しました', { variant: 'success' });
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
      <AppDrawer 
        drawerOpen={drawerOpen} 
        handleDrawerClose={handleDrawerClose} 
        handleModalOpen={handleModalOpen}
        handleLoginClick={handleLoginClick}
        handleLogoutClick={handleLogoutClick}
        currentUser={currentUser}
      />
      <InformationModal 
        modalOpen={modalOpen} 
        handleModalClose={handleModalClose} 
        modalTitle={modalTitle} 
        modalContent={modalContent} 
      />
    </>
  );
}
