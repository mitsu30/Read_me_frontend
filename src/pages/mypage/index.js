import { Button, Card, CardMedia, CardContent, Typography, Avatar, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Skeleton } from '@mui/material';
import axios from 'axios';
import nookies from "nookies";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import CenteredBox from '../../components/CenteredBox';
import { useAuthContext } from '../../context/AuthContext';

// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

const StyledCard = styled(Card)(({ theme }) => ({
  width: 280, 
  margin: theme.spacing(1), 
  padding: theme.spacing(1), 
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
  transition: 'transform 0.3s', 
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)', 
  backgroundColor: '#f9f9f9', 
  border: '1px solid #ddd', 
  '&:hover': {
    transform: 'scale(1.05) rotate(3deg)', 
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 250, 
  objectFit: 'contain', 
}));

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { AuthContext} = useAuthContext(); 
  const { isStudent } = AuthContext;
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const cookies = nookies.get();
      const config = {
        headers: { authorization: `Bearer ${cookies.token}` },
      };
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages`, config);
      setUser(res.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //どのタブが現在アクティブであるかを管理している。
  //ユーザーが切り替えたタブを追跡し、表示するコンテンツを更新する
  // const handleChange = (event, newValue) => {  
  //   setValue(newValue); 
  // };

  const handleCardClick = (profile) => {
    router.push(`/mypage/${profile.uuid}`);
  };

  const handleEdit = () => {
    router.push(`/mypage/edit`);
  }
  
  const renderPrivacySetting = (privacy) => {
    switch(privacy) {
      case 'opened':
        return '全体';
      case 'closed':
        return '自分のみ';
      case 'membered_communities_only':
        return '所属コミュニティ';
      default:
        return '';
    }
  };
  
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
      <Typography 
        component="h1" 
        variant="h1" 
        fontWeight="bold" 
        style={{ 
          fontSize: isSmallScreen ? '3rem' : '5.5rem',  
        }}
      >
        マイページ
      </Typography>
    </Box>
    <CenteredBox>
        <Button 
          variant="contained"
          sx={{ 
            mt: 2,
            mb: 2, 
            backgroundColor: '#FF6699',
            '&:hover': {
              backgroundColor: '#E60073',
            },
            color: '#white',
            fontWeight: 'bold',
            fontSize: '1.0em',
            padding: '2px 15px' 
          }}
          onClick={handleEdit}
        > 
          へんしゅう
        </Button>
      </CenteredBox>
    
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
              {isStudent &&(
              <TableCell align="center" style={{ width: '25%', height: '10px', borderBottom: '1px solid #808080' }}>所属</TableCell>
              )}
              <TableCell align="center" style={{ width: isSmallScreen ? '30%' : '40%', height: '10px', display: isSmallScreen ? 'none' : 'table-cell', borderBottom: '1px solid #808080' }}>みんなにひとこと！</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <Skeleton variant="circle" width={80} height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={user.id}>
                  <TableCell >
                    <Avatar src={user.avatar_url} alt={user.name} sx={{ width: 80, height: 80 }}/> 
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  {/* <TableCell align="center">{user.communities.map(community => community.name).join(', ')}</TableCell> */}
                  {isStudent &&(
                  <TableCell align="center">{user.groups.map(group => group.name).join(', ')}</TableCell>
                  )}
                  <TableCell align="center" style={{ display: isSmallScreen ? 'none' : 'table-cell' }}>{user.greeting}</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    {/* <Tabs value={value} onChange={handleChange} centered>
      <Tab  label="プロフィール帳" />
      <Tab label="お気に入り" />
    </Tabs> */}

    {/* <TabPanel value={value} index={0}> */}
      <CardContent>
      {isLoading ? (
        <Skeleton variant="rectangular" width={280} height={180} />
      ) : (
        <Grid container  justify="center"> 
          {user.profiles.map((profile) => (
            <Grid item xs={12} sm={6} md={4} key={profile.id} >
              <Box display="flex" justifyContent="center">
                <StyledCard onClick={() => handleCardClick(profile)}>
                  <StyledCardMedia
                    component="img" 
                    image={profile.image_url}
                  />
                  公開範囲: {renderPrivacySetting(profile.privacy)}
                  {profile.privacy === 'membered_communities_only' && (
                    <Typography>
                      公開コミュニティ: {profile.open_range_communities.join(', ')}
                    </Typography>
                  )}
                </StyledCard>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      </CardContent>
    {/* </TabPanel> */}

    {/* <TabPanel value={value} index={1}>
      <CardContent>
        準備中です！
      </CardContent>
    </TabPanel> */}
    </>
  );
};

export default MyPage;
