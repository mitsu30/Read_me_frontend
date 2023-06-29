import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import PolicyIcon from '@mui/icons-material/Policy';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';

function Sidebar({ handleModalOpen, handleLoginClick, currentUser }) {
  return (
    <Drawer anchor="left" variant="permanent">
      <List>
        <ListItem button onClick={() => handleModalOpen('コミュニティ', '準備中です！')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="コミュニティ" />
        </ListItem>
        <ListItem button onClick={handleLoginClick}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="ログイン" />
        </ListItem>
        <ListItem button onClick={() => handleModalOpen('利用規約', '準備中です！')}>
          <ListItemIcon>
            <PolicyIcon />
          </ListItemIcon>
          <ListItemText primary="利用規約" />
        </ListItem>
        <ListItem button component="a" href="https://kiyac.app/privacypolicy/8LceFAKn3LueySAB3tNs" target="_blank">
          <ListItemIcon>
            <PolicyIcon />
          </ListItemIcon>
          <ListItemText primary="プライバシーポリシー" />
        </ListItem>
        <ListItem button component="a" href="https://twitter.com/readmee_profile" target="_blank">
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="お問い合わせ" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="© 2023 りーどみー" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
