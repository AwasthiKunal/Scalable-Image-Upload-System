const uploadToS3 = require("../services/s3Service");

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        console.log(
            `Handled by PORT ${process.env.PORT}`
        );

        const imageUrl = await uploadToS3(req.file);

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    uploadImage,
};