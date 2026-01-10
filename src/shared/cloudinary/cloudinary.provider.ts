import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from 'src/core';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () =>{
    cloudinary.config({
        api_key: CLOUD_API_KEY,
        cloud_name: CLOUD_NAME,
        api_secret: CLOUD_API_SECRET
    });
    return cloudinary;
  },
};