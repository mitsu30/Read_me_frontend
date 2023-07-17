import { useRouter } from 'next/router';
import { Box, CardMedia, CardContent, Grid, Card, IconButton, Modal, Button, Typography, Skeleton } from '@mui/material';
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
import { useState, useEffect} from 'react';
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import CenteredBox from '../../components/CenteredBox';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'; 

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
  const [openModal, setOpenModal] = useState(false);
  const [openModalForOpenRange, setOpenModalForOpenRange] = useState(false);
  const [openRange, setOpenRange] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [userCommunities, setUserCommunities] = useState([]);
  const [openRanges, setOpenRanges] = useState([]);
  const [isLiked, setIsLiked] = useState(false); 

  const shareUrl = `https://readmeee.vercel.app/profiles/${id}?shared=true`;

  useEffect(() => {
    const fetchData = async () => {
      const cookies = nookies.get(null);
      const config = {
        headers: { authorization: `Bearer ${cookies.token}` },
      };

      const profileRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/${id}`, config);
      const profileImageData = await profileRes.data;
      setProfileImage(profileImageData);
      
      const communitiesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/communities/${id}`, config);
      const userCommunitiesData = await communitiesRes.data.user_communities;
      setUserCommunities(userCommunitiesData);

      const openRangesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/open_ranges/${id}`, config);
      const openRangesData = await openRangesRes.data.open_ranges;
      setOpenRanges(openRangesData);

      setOpenRange(profileImageData.privacy);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes/check?profile_id=${id}`, config)
      setIsLiked(res.data.isLiked);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    setCommunities(userCommunities.map(community => {
      const isChecked = openRanges.some(openRange => openRange.community_id === community.id);
      return { ...community, checked: isChecked };
    }));
  }, [userCommunities]);

  useEffect(() => {
    setCommunities(userCommunities.map(community => {
      const isChecked = openRanges.some(openRange => openRange.community_id === community.id);
      return { ...community, checked: isChecked };
    }));
  }, [openRanges]);


  const handleTwitterShare = () => {
    let tweetText;
    switch(profileImage.template_id) {
      case 1:
        tweetText = 'みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳';
        break;
      case 2:
        tweetText = 'わたしのプロフィール帳みんなみてね♪ #りーどみー #RUNTEQ #大人のプロフィール帳';
        break;
      case 3:
        tweetText = 'ひよっこエンジニアなかま募集中♪ #駆け出しエンジニアと繋がりたい #りーどみー #RUNTEQ';
        break;
      default:
        tweetText = 'わたしのプロフィール！みんなよろしく♪ #りーどみー #RUNTEQ #大人のプロフィール帳';
        break;
    }
    setTimeout(() => {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tweetText)}`, '_blank');
    }, 700); 
  };

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
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles/base/${id}`, config);
      if (response.status === 200) {
        setTimeout(() => {
          router.push('/mypage');  
        }, 100);
        enqueueSnackbar('プロフィール帳を削除したよ！', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleMypage = () => {
    router.push('/mypage'); 
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
  };

  const handleOpenRangeUpdate = async () => {
    if (openRange === "membered_communities_only" && !communities.some(community => community.checked)) {
      enqueueSnackbar('プロフィール帳を公開するコミュニティを選択してください', { variant: 'error' });
      return;
    }

    try {
        const formData = new FormData();
        formData.append('profile[privacy]', openRange); 
        if (openRange === "membered_communities_only") { 
          const checkedCommunities = communities.filter(community => community.checked).map(community => community.id);
          for (let i = 0; i < checkedCommunities.length; i++) {
            formData.append(`community_id`, checkedCommunities[i]);
          }
        }
        // console.log(...formData);
    
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
            router.push(`/mypage/${id}`);
          } else {
            enqueueSnackbar('プロフィール帳の更新に失敗しました', { variant: 'error' });
          }
        } catch (error) {
          enqueueSnackbar('エラーが発生しました', { variant: 'error' });
          console.error(error);
        }
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

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes/${id}`, config)
        if (response.status === 200) {
          setIsLiked(false);
          enqueueSnackbar('お気に入りを解除したよ！', { variant: 'success' });
        } else {
          enqueueSnackbar('お気に入りの解除に失敗しました', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('エラーが発生しました', { variant: 'error' });
        console.error(error);
    };
  };

  return (
    <>
    <CardContent>
      <Grid item sx={{ my: 1 }}>
        <StyledCard sx={{ my: 2 }}>
          {profileImage ? (
            <StyledCardMedia component="img" image={profileImage.image_url} />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={118} />
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
            {/* <Tooltip title="お気に入り">
              <IconButton onClick={handleOpenModalStar}>
                <StarBorderOutlinedIcon sx={{ color: 'orange' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="チャット">
              <IconButton onClick={handleOpenModalChat}>
                <ChatBubbleOutlineOutlinedIcon sx={{ color: 'gray' }} />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="公開範囲の設定">
              <IconButton onClick={handleOpenModalForOpenRange}>
                <LockIcon sx={{ color: '#ffd700' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="プロフィール帳の削除">
              <IconButton onClick={handleOpenModal}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitterシェア">
              <IconButton onClick={handleTwitterShare}>
                <TwitterIcon sx={{ color: '#55acee' }} />
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
            マイページへ
          </Button>
        </CenteredBox>
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
          <FormControl sx={{minWidth: 120 }} size="small">
            <Select
              value={openRange}
              onChange={handleOpenRangeChange}
              sx={{ marginTop: '1rem' }}
            >
              <MenuItem value="opened">全体に公開</MenuItem>
              <MenuItem value="closed">自分のみ</MenuItem>
              <MenuItem value="membered_communities_only">コミュニティのなかま</MenuItem>
            </Select>
          </FormControl>

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


