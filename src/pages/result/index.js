import { useRouter } from 'next/router';
import { TwitterShareButton, TwitterIcon} from "react-share";
import Seo from '../../components/seo'

export default function ResultPage() {
  const router = useRouter();
  const { imageUrl } = router.query;

  // router.isReady が true になるまで待つ
  if (!router.isReady) return null;

  return (
    <>
        <Seo
        pageTitle={'site title'}
        pageDescription={'site description'}
        pageImg={'https://demo.com'}
        pageImgWidth={1280}
        pageImgHeight={960}
      />
      <h3>サンプル</h3>

      <div>
        <img src={imageUrl} alt="Generated" />
        <TwitterShareButton
          url={currentURL}
          title="Check out this image!"
          hashtags={["ImageGenerator"]}
          related={["TwitterHandle"]}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </>
  );
}






export async function getStaticProps() {
  
}

