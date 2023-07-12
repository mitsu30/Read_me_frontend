import { useRouter } from 'next/router';
import { useState } from "react";
import axios from "axios";

export const usePreviewAndSubmit = (nickname, hobby, message) => {
  const [imageUrl, setImageUrl] = useState("/template1.png");
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  const handlePreview = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/preview`, { image_text: { nickname, hobby, message } });
      setImageUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts`, { image_text: { nickname, hobby, message } });
      
      if (response.status !== 200) {
        throw new Error('Request failed with status: ' + response.status);
      }
  
      const img = new Image();
  
      img.onload = () => {
        setImageUrl(response.data.url);
        setIsNavigating(true);
        router.push({
          pathname: '/result/[id]', 
          query: { id: response.data.id }, 
        });
  
        setIsLoading(false);
      };
  
      img.onerror = () => {
        throw new Error('Image load failed');
      };
  
      img.src = response.data.url;
  
    } catch (error) {
      console.error(error);
      setIsLoading(false); //念の為
    }
  };

  return { imageUrl, isLoading, isNavigating, handlePreview, handleSubmit };
}
