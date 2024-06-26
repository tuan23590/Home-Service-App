import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Create upload directories if they don't exist
const uploadImagePath = join(__dirname, 'uploads', 'images');
const uploadDocumentPath = join(__dirname, 'uploads', 'files');
fs.promises.mkdir(uploadImagePath, { recursive: true }).catch(err => console.error('Error creating images directory: ', err));
fs.promises.mkdir(uploadDocumentPath, { recursive: true }).catch(err => console.error('Error creating files directory: ', err));

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = file.mimetype.startsWith('image/') ? uploadImagePath : uploadDocumentPath;
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
app.post('/upload-image', upload.single('hinhAnh'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({ path: `/uploads/images/${req.file.filename}` });
});

app.post('/upload-document', upload.single('taiLieu'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({ path: `/uploads/files/${req.file.filename}` });
});

app.get('/list-images', (req, res) => {
    fs.readdir(uploadImagePath, (err, files) => {
        if (err) {
            console.error('Error reading images directory: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const imagePaths = files.map(file => ({
            path: `/uploads/images/${file}`
        }));
        res.json(imagePaths);
    });
});

app.get('/list-documents', (req, res) => {
    fs.readdir(uploadDocumentPath, (err, files) => {
        if (err) {
            console.error('Error reading documents directory: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const documentPaths = files.map(file => ({
            path: `/uploads/files/${file}`
        }));
        res.json(documentPaths);
    });
});

app.delete('/delete-image/:filename', (req, res) => {
    const imagePath = join(uploadImagePath, req.params.filename);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    });
});

app.delete('/delete-document/:filename', (req, res) => {
    const documentPath = join(uploadDocumentPath, req.params.filename);
    fs.unlink(documentPath, (err) => {
        if (err) {
            console.error('Error deleting document: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});