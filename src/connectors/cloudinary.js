const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

class cloud {

    static async uploads(file, folder = '') {
        return new Promise(resolve => {
            cloudinary.uploader.upload(
                file,
                result => {
                    resolve({ url: result.secure_url, public_id: result.public_id });
                },
                { resource_type: "auto", folder }
            );
        })
    }

    static async remove(public_id) {
        return new Promise(resolve => {
            cloudinary.uploader.destroy(
                public_id,
                result => {
                    resolve({ result });
                }
            );
        })
    }

}

module.exports = cloud
