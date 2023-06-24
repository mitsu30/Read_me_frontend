import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import axios from "axios";


export default function ResultPage({ profileImage }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const shareUrl = `https://readmeee.vercel.app/profiles/${id}?shared=true`;
  const siteTitle = "りーどみー";
  const siteDescription = "あなたのプロフィール帳シェアしませんか";

  useEffect(() => {
    if (shared === 'true') {
      router.push('/');
    }
  }, [shared, router]);

  return (
    <>
      <NextSeo
        twitter={{
          cardType: "summary_large_image",
          handle: "@readmee_profile", 
          site: "@readmee_profile"
        }}
        title={siteTitle}
        description={siteDescription}
        openGraph={{
          url: shareUrl,
          title: siteTitle,
          description: siteDescription,
          images: [
            {
              url: profileImage.image_url, 
              width: 800,
              height: 600,
              alt: 'Result Image',
            }
          ],
          site_name: 'りーどみー',
        }}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, shared } = context.query;
  const userAgent = context.req.headers['user-agent'];

  if (!userAgent.includes('Twitterbot')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/twitter_share/${id}`);
  const profileImage = await res.data;
  // console.log(res.data);

  return {
    props: {
      profileImage,
    },
  }
}


