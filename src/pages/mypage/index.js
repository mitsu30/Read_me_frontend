import { Card, CardContent, Typography, Avatar, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ height: '10px'}}>
              <TableCell align="center" style={{ width: '10%', height: '10px', borderBottom: '1px solid #808080' }}></TableCell>
              <TableCell align="center" style={{ width: '30%', height: '10px', borderBottom: '1px solid #808080' }}>
                なまえ
              </TableCell>
              {/* <TableCell align="center" style={{ width: '20%', height: '10px', borderBottom: '1px solid #808080' }}>所属</TableCell> */}
              <TableCell align="center" style={{ width: '25%', height: '10px', borderBottom: '1px solid #808080' }}>所属</TableCell>
              <TableCell align="center" style={{ width: isSmallScreen ? '30%' : '40%', height: '10px', display: isSmallScreen ? 'none' : 'table-cell', borderBottom: '1px solid #808080' }}>みんなにひとこと！</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={user.id}>
                <TableCell >
                  <Avatar src={user.avatar_url} alt={user.name} sx={{ width: 80, height: 80 }}/> 
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                {/* <TableCell align="center">{user.communities.map(community => community.name).join(', ')}</TableCell> */}
                <TableCell align="center">{user.groups.map(group => group.name).join(', ')}</TableCell>
                <TableCell align="center" style={{ display: isSmallScreen ? 'none' : 'table-cell' }}>{user.greeting}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    <Tabs value={value} onChange={handleChange} centered>
      <Tab  label="プロフィール帳" />
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
  // console.log(res)
  return { props: { user: res.data.data } };
}

export default MyPage;
