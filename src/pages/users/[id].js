export async function getServerSideProps(context) {
  const { id } = context.query;

  const cookies = nookies.get(context);
  
  let res;
  if (cookies.token) {
    // ログインユーザー
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };
    res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, config);
  } else {
    // 非ログインユーザー
    res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/show_public${id}`);
  }

  return {
    props: {
      user: res.data.data
    },
  };
}




