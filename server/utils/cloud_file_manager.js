const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const keys = require('../config/keys');
const cloudHomeDir = keys.cloudinary.homeDir;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: keys.cloudinary.cloudName,
    api_key: keys.cloudinary.apiKey,
    api_secret: keys.cloudinary.apiSecretKey,
});
/**
 * cloudinaryFileStroage - Handles image upload to the cloud
 * @param {File} image 
 * @param {Str} cloud_file_path : path to file storage, btw shouldn't start with a slash /
 * @returns ImageUrl and ImageKey
 */
async function cloudinaryFileStorage(image, cloud_file_path) {
    try {
        // Save image locally temporarily
        const tempFilePath = `./temp-${Date.now()}-${image.originalname}`;
        fs.writeFileSync(tempFilePath, image.buffer);
        // const imageName = image.originalname.replace(/[^\w\p{P}\p{S}]/gu, '_');

        // Upload the image to Cloudinary
        const newName = `temp-${Date.now()}-${image.originalname.replace(/[^\w\p{P}\p{S}]/gu, '_')}`
        const uploadResponse = await cloudinary.uploader.upload(tempFilePath, {
            folder: cloudHomeDir + cloud_file_path,
            public_id: path.parse(newName).name,
        });

        // Clean up local temp file
        fs.unlinkSync(tempFilePath);

        // Return the image URL and key
        const imageKey = uploadResponse.public_id;
        const imageUrl = uploadResponse.secure_url;

        return { imageKey, imageUrl };
    } catch (err) {
        console.error('Error uploading to Cloudinary:', err);
        throw err;
    }
}

module.exports = cloudinaryFileStorage;
