import { useRouter } from 'next/router';
import { Box, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 'auto',
  width: '100%',
  objectFit: 'contain',
}));

export default function ProfilePage({ profileImage }) {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <StyledCardMedia component="img" image={profileImage.image_url} />
    </Box>
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
