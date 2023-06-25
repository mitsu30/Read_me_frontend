import { Card, CardMedia, CardContent, Typography, Avatar, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import axios from 'axios';
import nookies from "nookies";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';



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

const StyledCard = styled(Card)(({ theme }) => ({
  width: 280, // カードの幅を固定
  margin: theme.spacing(6), // カードの周りの余白を設定
  padding: theme.spacing(1), // カードの内側の余白を設定
  display: 'flex', // カードの内容をフレックスボックスとして扱う
  flexDirection: 'column', // カードの方向をカラム（垂直）に設定
  alignItems: 'center', // カードの内容を中央に配置
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 156, // 画像の高さを固定
  width: '100%', // 画像の幅を100%に設定
  objectFit: 'contain', // 画像を全体が見えるように配置
}));

const MyPage = ({ user }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  
  //どのタブが現在アクティブであるかを管理している。
  //ユーザーが切り替えたタブを追跡し、表示するコンテンツを更新する
  const handleChange = (event, newValue) => {  
    setValue(newValue); 
  };

  const handleCardClick = (profile) => {
    router.push(`/mypage/${profile.uuid}`);
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
        <Grid container spacing={2} justify="center"> 
        {user.profiles.map((profile) => (
          <Grid item key={profile.id} >
            <StyledCard onClick={() => handleCardClick(profile)}>
              <StyledCardMedia
                component="img" 
                image={profile.image_url}
              />
            </StyledCard>
          </Grid>
        ))}
        </Grid>
      </CardContent>
    </TabPanel>

    <TabPanel value={value} index={1}>
      <CardContent>
        準備中です！
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
  // console.log(res.data.data)
  return { props: { user: res.data.data } };
}

export default MyPage;
