import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Box, CardMedia, CardContent, Grid, Card, IconButton, Skeleton, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'; 
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import CenteredBox from '../../../components/CenteredBox'
import { useSnackbar } from 'notistack';

const StyledCard = styled(Card)(({ theme }) => ({ 
  width: '90%', 
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
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState('');

  // const [openModalHeart, setOpenModalHeart] = useState(false);
  // const [openModalStar, setOpenModalStar] = useState(false);
  // const [openModalChat, setOpenModalChat] = useState(false);
  const [isLiked, setIsLiked] = useState(false); 

  
  useEffect(() => {
    const fetchData = async () => {
      const cookies = nookies.get(null);
      let config = null;
      if (cookies.token) {
        config = { headers: { authorization: `Bearer ${cookies.token}` } };
      }

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/show_for_community/${id}`, config) 
        // : await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/show_public/${id}`);

      setProfileImage(res.data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    const checkLikedStatus = async () => {
      const cookies = nookies.get(null);
      let config = null;
      if (cookies.token) {
        config = { headers: { authorization: `Bearer ${cookies.token}` } };
      }
  
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes/check?profile_id=${id}`, config)
      console.log(res.data)
      setIsLiked(res.data.isLiked);
    }
  
    checkLikedStatus();
  }, [id]);

  const handleMypage = () => {
    router.push(`/users/${profileImage.user_id}`); 
  };
  
  const handleOpenModalStar = () => {
    setOpenModalStar(true);
  };
  
  const handleCloseModalStar = () => {
    setOpenModalStar(false);
  };
  
  const handleOpenModalChat = () => {
    setOpenModalChat(true);
  };
  
  const handleCloseModalChat = () => {
    setOpenModalChat(false);
  };

  const handleLike = async () => {
    
    try {
      const formData = new FormData();
      formData.append('profile_id', id);

      const cookies = nookies.get(null);
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${cookies.token}` 
        },
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`, formData, config)
        if (response.status === 200) {
          setIsLiked(true);
          enqueueSnackbar('お気に入りに登録したよ！', { variant: 'success' });
        } else {
          enqueueSnackbar('お気に入りの登録に失敗しました', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('エラーが発生しました', { variant: 'error' });
        console.error(error);
    };
  }
  
  const handleUnlike = async () => {
    setIsLiked(false); // ユーザーが「いいね」を取り消すと、isLikedをfalseに設定します。
  };
  
  return (
    <>
    <CardContent>
      <Grid item sx={{ my: 5 }}>
        <StyledCard sx={{ my: 2 }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="auto" />
          ) : (
            <StyledCardMedia component="img" image={profileImage.image_url} />
          )}
        </StyledCard>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconCard>
            <Tooltip title="いいね">
              <IconButton onClick={isLiked ? handleUnlike : handleLike}>
                {isLiked ? (
                  <FavoriteOutlinedIcon sx={{ color: 'Red' }} />
                ) : (
                  <FavoriteBorderOutlinedIcon sx={{ color: 'Red' }} /> 
                )}
              </IconButton>
            </Tooltip>
          </IconCard>
        </Box>
        <CenteredBox>
          <Button 
            type="submit"
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              position: 'static', 
              marginTop: '20px', 
              fontSize: '1.0em',
              padding: '8px 8px', 
              backgroundColor: '#FF6699',
              '&:hover': {
                backgroundColor: '#E60073',
              },
              color: '#white',
              fontWeight: 'bold'  
            }}
            onClick={handleMypage}
          >
            {profileImage.username}さんのページへ
          </Button>
        </CenteredBox>
      </Grid>
    </CardContent>   
    </>
  );
}
