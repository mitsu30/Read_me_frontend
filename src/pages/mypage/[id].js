import { useRouter } from 'next/router';
import { Box, CardMedia, CardContent, Grid, Card, IconButton  } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import TwitterIcon from '@mui/icons-material/Twitter';

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
            <IconButton><LockIcon sx={{ color: '#ffd700' }}/></IconButton>
            <IconButton><DeleteIcon /></IconButton>
            <IconButton><TwitterIcon sx={{ color: '#55acee' }}/></IconButton>
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
