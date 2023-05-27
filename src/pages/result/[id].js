import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function ResultPage({imageText}) {
  const router = useRouter();
 
  return (
    <>
      <NextSeo
        title={'site title'}
        description={'site description'}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_APP_URL}/result/${imageText.id}`,
          title: 'site title',
          description: 'site description',
          images: [
            {
              url: imageText.image_url, // Use url from the props
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
      <button onClick={() => window.open(
        `https://twitter.com/share?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/result/${imageText.id}`)}&text=Check out this cool image I created!`, '_blank')}>
        Share on Twitter
      </button>
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
