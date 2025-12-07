const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json({ limit: "10mb" })); // increase limit if needed

// Set storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload endpoint
app.post("/upload", upload.single("planner"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Public URL to the uploaded image
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
