const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json({ limit: "50mb" }));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME",
    api_key: process.env.CLOUDINARY_API_KEY || "YOUR_API_KEY",
    api_secret: process.env.CLOUDINARY_API_SECRET || "YOUR_API_SECRET",
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("planner"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "daily_planner",
                resource_type: "image",
                format: "png", 
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Error:", error);
                    return res.status(500).json({ error: "Cloud upload failed" });
                }

                return res.json({ url: result.secure_url });
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    } catch (err) {
        console.error("Upload Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Cloudinary server running at http://localhost:${PORT}`));
