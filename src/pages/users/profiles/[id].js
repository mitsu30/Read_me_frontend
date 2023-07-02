import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, CardMedia, CardContent, Grid, Card, IconButton, Skeleton } from '@mui/material';
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

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query; 

  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const cookies = nookies.get(null);
      let config = null;
      if (cookies.token) {
        config = { headers: { authorization: `Bearer ${cookies.token}` } };
      }

      const res = cookies.token 
        ? await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/${id}`, config) 
        : await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/show_public/${id}`);

      setProfileImage(res.data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  return (
    <>
    <CardContent>
      <Grid item sx={{
                my: 5,
              }}>
        <StyledCard sx={{ my: 2 }}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height="auto" />
              ) : (
                <StyledCardMedia
                  component="img" 
                  image={profileImage.image_url}
                />
              )}
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

