import axios from 'axios';

export const wakeUpServer = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wakeup`);
  console.log("Server wakeup response: ", response);
};

export const generatePreview = async (data) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts/preview`, data);
  return response.data.url;
};

export const generateImageText = async (data) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image_texts`, data);
  return response.data;
};
