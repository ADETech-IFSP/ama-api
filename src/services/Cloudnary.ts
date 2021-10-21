import cloudinary = require('cloudinary');

export const uploadImage = async (base64 : string) => {
    cloudinary.v2.config({
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_NAME,
        
    })

    const response = await cloudinary.v2.uploader.upload(base64)

    return response.url;
}