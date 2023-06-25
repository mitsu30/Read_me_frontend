import { useRouter } from 'next/router';
import { Box, CardMedia, CardContent, Grid, Card, IconButton  } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import TwitterIcon from '@mui/icons-material/Twitter';

const StyledCard = styled(Card)(({ theme }) => ({ 
  width: '65%', 
  margin: 'auto', // カードの周りの余白を設定
  padding: theme.spacing(1), // カードの内側の余白を設定
  display: 'flex', // カードの内容をフレックスボックスとして扱う
  flexDirection: 'column', // カードの方向をカラム（垂直）に設定
  alignItems: 'flex', // カードの内容を中央に配置
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 'auto',
  width: '100%',
  objectFit: 'contain',
}));

export default function ProfilePage({ profileImage }) {
  const router = useRouter();

  return (
    <>
    <CardContent>
      <Grid item sx={{
                my: 5,
              }}>
        <StyledCard>
          <StyledCardMedia
            component="img" 
            image={profileImage.image_url}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <IconButton><FavoriteBorderOutlinedIcon sx={{ color: 'Red' }}/></IconButton>
            <IconButton><StarBorderOutlinedIcon  sx={{ color: 'orange' }} /></IconButton>
            <IconButton><ChatBubbleOutlineOutlinedIcon sx={{ color: 'gray' }}/></IconButton>
            <IconButton><SettingsIcon /></IconButton>
            <IconButton><DeleteIcon /></IconButton>
            <IconButton><TwitterIcon sx={{ color: '#55acee' }}/></IconButton>
          </Box>
        </StyledCard>
      </Grid>
    </CardContent>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const cookies = nookies.get(context);
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages/profile/${id}`, config);
  const profileImage = await res.data;
  // console.log(res)
  // console.log(res.data)
  return { 
    props: { 
      profileImage
    } 
  };
}
