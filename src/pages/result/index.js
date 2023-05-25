import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TwitterShareButton, TwitterIcon} from "react-share";

export default function ResultPage() {
  const router = useRouter();
  const { imageUrl } = router.query;
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  // router.isReady が true になるまで待つ
  if (!router.isReady) return null;

  return (
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
  );
}
