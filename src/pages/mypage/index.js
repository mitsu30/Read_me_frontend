import { Card, CardContent, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import nookies from "nookies";

const MyPage = ({ user }) => (
  <Card>
    <CardContent>
      <Avatar src={user.avatar_url} />
      <Typography variant="h5" component="div">
        {user.name}
      </Typography>
      <Typography variant="body2">
        Communities: {user.communities.map(community => community.name).join(', ')}
      </Typography>
      <Typography variant="body2">
        Groups: {user.groups.map(group => group.name).join(', ')}
      </Typography>
    </CardContent>
  </Card>
);

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypages`, config);
  // console.log(res.data)
  // console.log(res.data.data.communities)
  // console.log(res.data.data.communities[0].name)

  return { props: { user: res.data.data } };
}

export default MyPage;



