import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, CardMedia, CardContent, Grid, Card, IconButton, Skeleton, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';


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

  const [openModalHeart, setOpenModalHeart] = useState(false);
  const [openModalStar, setOpenModalStar] = useState(false);
  const [openModalChat, setOpenModalChat] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      const cookies = nookies.get(null);
      let config = null;
      if (cookies.token) {
        config = { headers: { authorization: `Bearer ${cookies.token}` } };
      }

      const res = cookies.token 
        ? await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/show_for_community/${id}`, config) 
        : await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/show_public/${id}`);

      setProfileImage(res.data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleOpenModalHeart = () => {
    setOpenModalHeart(true);
  };
  
  const handleCloseModalHeart = () => {
    setOpenModalHeart(false);
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
              <IconButton onClick={handleOpenModalHeart}>
                <FavoriteBorderOutlinedIcon sx={{ color: 'Red' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="お気に入り">
              <IconButton onClick={handleOpenModalStar}>
                <StarBorderOutlinedIcon sx={{ color: 'orange' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="チャット">
              <IconButton onClick={handleOpenModalChat}>
                <ChatBubbleOutlineOutlinedIcon sx={{ color: 'gray' }} />
              </IconButton>
            </Tooltip>
          </IconCard>
        </Box>
      </Grid>
    </CardContent>   
    <Modal
      open={openModalHeart}
      onClose={handleCloseModalHeart}
    >
    <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
      準備中です！
    </Box>
  </Modal>

  <Modal
    open={openModalStar}
    onClose={handleCloseModalStar}
  >
    <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
      準備中です！
    </Box>
  </Modal>

    <Modal
      open={openModalChat}
      onClose={handleCloseModalChat}
    >
    <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
         準備中です！
     </Box>
    </Modal>
    </>
  );
}

