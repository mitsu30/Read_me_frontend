import { useRouter } from 'next/router';
import { Box, CardMedia, CardContent, Grid, Card, IconButton, Modal, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';


const StyledCard = styled(Card)(({ theme }) => ({ 
  width: '65%', 
  margin: 'auto', 
  padding: theme.spacing(1), 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'flex', 
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 'auto',
  width: '100%',
  objectFit: 'contain',
}));

const IconCard = styled(Card)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'flex',  
}));

export default function ProfilePage({ profileImage }) {
  const router = useRouter();
  const { id, shared } = router.query; 

  return (
    <>
    <CardContent>
      <Grid item sx={{
                my: 5,
              }}>
        <StyledCard sx={{ my: 2}}>
          <StyledCardMedia
            component="img" 
            image={profileImage.image_url}
            />
        </StyledCard>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <IconCard>    
            <IconButton><FavoriteBorderOutlinedIcon sx={{ color: 'Red' }}/></IconButton>
            <IconButton><StarBorderOutlinedIcon  sx={{ color: 'orange' }} /></IconButton>
            <IconButton><ChatBubbleOutlineOutlinedIcon sx={ { color: 'gray'}}/></IconButton>
          </IconCard>
        </Box>
      </Grid>
    </CardContent>  
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  
  const cookies = nookies.get(context);
  
  let res;
  if (cookies.token) {
    // ログインユーザー
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };
  
  res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/${id}`, config);
  const profileImage = await res.data;
  // console.log(profileImage)
} else {
  // 非ログインユーザー
  res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/show_public/${id}`);
}

  return { 
    props: { 
      profileImage: res.data
    } 
  };
}
