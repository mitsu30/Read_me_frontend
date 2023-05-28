import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function ResultPage({ imageText }) {
  const router = useRouter();
  const { id, shared } = router.query; 
  const shareUrl = `https://read-me-frontend-git-09twitter-mitsu30.vercel.app/result/${id}?shared=true`;

  return (
    <>
      <NextSeo
        twitter={{
          cardType: "summary_large_image"
        }}
        title={'りーどみー'}
        description={'大人のプロフィール帳'}
        openGraph={{
          url: shareUrl,
          title: 'site title',
          description: 'site description',
          images: [
            {
              url: imageText.image_url, 
              width: 800,
              height: 600,
              alt: 'Result Image',
            }
          ],
          site_name: 'site name',
        }}
      />

      <h3>サンプル</h3>
      <img src={imageText.image_url} alt="Generated Image" />
      {shared !== 'true' && (
        <button 
        onClick={() => window.open(
        `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=Check out this cool image I created!`, '_blank')}>
          Share on Twitter
        </button>
)}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(context.query)
  // Send a GET request to your API to get the data by id
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/${id}`);
  console.log(response)
  const imageText = await response.json();

  return {
    props: {
      imageText,
    },
  }
}

