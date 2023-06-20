import { Card, CardContent, Typography, Avatar, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import nookies from "nookies";
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MyPage = ({ user }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
    <Typography 
      component="h1" 
      variant="h1" 
      fontWeight="bold" 
      style={{ 
        // transform: 'scaleX(1.3)',
        fontSize: isSmallScreen ? '3rem' : '5.5rem',  // 画面幅に応じてフォントサイズを変更
      }}
    >
      マイページ
    </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
      <Avatar src={user.avatar_url} />
      <Typography variant="h5" component="div">
        {user.name}
      </Typography>
      <Typography variant="body2">
        Communities: {user.communities.map(community => community.name).join(', ')}
      </Typography>
      <Typography variant="body2">
        Groups: {user.groups.map(group => group.name).join(', ')}
      </Typography>
    </Box>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="プロフィール帳" />
        <Tab label="お気に入り" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <CardContent>
          準備中よ！
        </CardContent>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <CardContent>
          準備中なの！
        </CardContent>
      </TabPanel>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages`, config);
  return { props: { user: res.data.data } };
}

export default MyPage;
