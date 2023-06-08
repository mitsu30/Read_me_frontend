import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function AppDrawer({ drawerOpen, handleDrawerClose, handleModalOpen, handleLoginClick, handleLogoutClick, currentUser }) {
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button onClick={() => handleModalOpen('コミュニティ', '準備中です！')}>
            <ListItemText primary="コミュニティ" />
          </ListItem>
          <ListItem button onClick={currentUser ? handleLogoutClick : handleLoginClick}>
            <ListItemText primary={currentUser ? 'ログアウト' : 'ログイン'} />
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
  );
}

export default AppDrawer;
