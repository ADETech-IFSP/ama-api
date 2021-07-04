import cloudinary = require('cloudinary');

export const uploadImage = async (base64 : string) => {
    cloudinary.v2.config({
        api_secret: "sTOo9--YL1KiwjvVikxyAFoJu0k",
        api_key: "627582224793557",
        cloud_name: "amemais-tech",
        
    })

    const response = await cloudinary.v2.uploader.upload(base64)

    return response.url;
}