import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as MuiLink } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Link from 'next/link';
import LoginModal from '../LoginModal';
import { useState, useEffect, useRef  } from 'react';  
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useAuthContext } from '../../context/AuthContext';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.down('sm')]: { // changed from up to down
    width: `0px`, // changed from `calc(${theme.spacing(8)} + 1px)` to 0px
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#FFEEFF',  // Change color here
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false); 
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { AuthContext, userAvatar } = useAuthContext(); 
  const { currentUser, logout,  isStudent } = AuthContext;

  const drawerRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        handleDrawerClose();
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleLoginClick = () => {
    handleLoginModalOpen();
  };

  const handleLogout = () => {
    if (window.confirm("ログアウトしますか？")) {
      logout();
    }
  };
  
  const menuItems = currentUser ? [
    {text: 'マイページ', icon: <PersonIcon sx={{ color: '#f0c4ca' }}/>, link: '/mypage'},
    {text: 'つくる', icon: <EditNoteIcon sx={{ color: '#f0c4ca' }}/>, link: '/profiles'},
    {text: 'スクールのなかま', icon: <Diversity3Icon sx={{ color: '#f0c4ca' }}/>, link: '/users'},
    {text: '利用規約', icon: <DescriptionIcon sx={{ color: '#f0c4ca' }}/>, link: '/terms'},
    {text: 'プライバシーポリシー', icon: <PrivacyTipIcon sx={{ color: '#f0c4ca' }}/>, link: '/privacy-policy'},
    {text: 'お問い合わせ', icon: <ContactMailIcon sx={{ color: '#f0c4ca' }}/>, link: 'https://twitter.com/readmee_profile', external: true},
    {text: 'ログアウト', icon: <DirectionsRunIcon sx={{ color: '#f0c4ca' }}/>, onClick: handleLogout},
  ] : [
    {text: 'ログイン', icon: <LoginIcon sx={{ color: '#f0c4ca' }}/>, onClick: handleLoginClick},
    {text: '利用規約', icon: <DescriptionIcon sx={{ color: '#f0c4ca' }}/>, link: '/terms'},
    {text: 'プライバシーポリシー', icon: <PrivacyTipIcon sx={{ color: '#f0c4ca' }}/>, link: '/privacy-policy'},
    {text: 'お問い合わせ', icon: <ContactMailIcon sx={{ color: '#f0c4ca' }}/>, link: 'https://twitter.com/readmee_profile', external: true},
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: '#696969' }} />
          </IconButton>
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: '120px',
                height: 'auto',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </Link>
          <Box sx={{ marginLeft: 'auto' }}> 
          {currentUser ? (
            <Link href="/mypage">
            <a>
              <Tooltip title={isStudent ? "スクール生" : "一般ユーザー"}>
                <IconButton 
                  sx={{ 
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.25)'
                    }
                  }}
                >
                  <Avatar src={userAvatar} />
                </IconButton>
              </Tooltip>
            </a>
          </Link>
          ) : null}
          </Box> 
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} ref={drawerRef}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            item.external ?
              <ListItem disablePadding key={item.text}>
                <Tooltip title={item.text} placement="right">
                  <ListItemButton
                    component="a"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Tooltip>
              </ListItem>
            :
              item.link ?
                <Link href={item.link} passHref key={item.text}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={item.text} placement="right">
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                </Link>
              :
              <ListItem disablePadding key={item.text}>
                <Tooltip title={item.text} placement="right">
                  <ListItemButton
                    onClick={item.onClick}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />
        {open && (
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
            <MuiLink component="button" underline="none" sx={{ cursor: 'default', color: '#000000' }}>
              © 2023 りーどみー
            </MuiLink>
          </Box>
        )}
      </Drawer>
      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
    </Box>
  );
}
