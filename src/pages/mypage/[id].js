import { useRouter } from 'next/router';
import { Box, CardMedia, CardContent, Grid, Card, IconButton, Modal, Button, Typography  } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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

export default function ProfilePage({ profileImage, userCommunities }) {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [openModalForOpenRange, setOpenModalForOpenRange] = useState(false);
  const [openRange, setOpenRange] = useState('');  
  const [communities, setCommunities] = useState(userCommunities.user_communities.map(community => ({ ...community, checked: false })));


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  const handleDeleteProfile = async () => {
    const cookies = nookies.get(null);
    const config = {
      headers: { 
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${cookies.token}` 
      },
    };
    
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1//profiles/${id}`, config);
      if (response.status === 200) {
        setTimeout(() => {
          router.push('/mypage');  // or wherever you want to redirect after delete
        }, 100);
        enqueueSnackbar('プロフィール帳を削除したよ！', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenModalForOpenRange = () => {
    setOpenModalForOpenRange(true);
  };

  const handleCloseModalForOpenRange = () => {
    setOpenModalForOpenRange(false);
  };
  
  const handleCheckboxChange = (index) => {
    setCommunities(communities.map((community, i) => i === index ? { ...community, checked: !community.checked } : community));
  };

  const handleOpenRangeChange = (event) => {
    setOpenRange(event.target.value);
    // fetch user's communities here if necessary...
  };

  const handleOpenRangeUpdate = async () => {
    try {
        const formData = new FormData();
        formData.append('profile[privacy]', openRange); 
        if (openRange === "membered_communities_only") { 
          const checkedCommunities = communities.filter(community => community.checked).map(community => community.id);
          for (let i = 0; i < checkedCommunities.length; i++) {
            formData.append(`community_id`, checkedCommunities[i]);
          }
        }
        console.log(...formData);
    
        const cookies = nookies.get(null);
        const config = {
          headers: { 
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${cookies.token}` 
          },
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/open_ranges/${id}`,
          formData,
          config
        );

        handleCloseModalForOpenRange();

        if (response.status === 200) {
            enqueueSnackbar('プロフィール帳を更新しました', { variant: 'success' });
            router.push("/users");
          } else {
            enqueueSnackbar('プロフィール帳の更新に失敗しました', { variant: 'error' });
          }
        } catch (error) {
          enqueueSnackbar('エラーが発生しました', { variant: 'error' });
          console.error(error);
        }
      };

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
            <IconButton onClick={handleOpenModalForOpenRange}><LockIcon sx={{ color: '#ffd700' }}/></IconButton>
            <IconButton onClick={handleOpenModal}><DeleteIcon /></IconButton>
            <IconButton><TwitterIcon sx={{ color: '#55acee' }}/></IconButton>
          </IconCard>
        </Box>
      </Grid>
    </CardContent>
    
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: 'black', padding: '1rem' }}>
          <Typography variant="h6" component="h2">
            このプロフィール帳を削除しますか？
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="outlined" color="primary" onClick={handleDeleteProfile}>はい</Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>いいえ</Button>
          </Box>
        </Box>
      </Box>
    </Modal>

    <Modal
      open={openModalForOpenRange}
      onClose={handleCloseModalForOpenRange}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: 'black', padding: '1rem' }}>
          <Typography variant="h6" component="h2">
            プロフィール帳の公開範囲
          </Typography>
          <Select
            value={openRange}
            onChange={handleOpenRangeChange}
            sx={{ marginTop: '1rem' }}
          >
            <MenuItem value="opened">全体に公開</MenuItem>
            <MenuItem value="closed">自分のみ</MenuItem>
            <MenuItem value="membered_communities_only">コミュニティのなかま</MenuItem>
          </Select>

          {openRange === 'membered_communities_only' && communities.map((community, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={community.checked}
                  onChange={() => handleCheckboxChange(index)}
                  color="primary"
                />
              }
              label={community.name}
            />
          ))}

          <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="outlined" color="primary" onClick={handleOpenRangeUpdate}>更新する</Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModalForOpenRange}>もどる</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const cookies = nookies.get(context);
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };

  const profileRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/${id}`, config);
  const profileImage = await profileRes.data;
  // console.log(profileImage)

  const communitiesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/communities/${id}`, config);
  const userCommunities = await communitiesRes.data;
  // console.log(userCommunities)

  return { 
    props: { 
      profileImage,
      userCommunities,
    } 
  };
}
