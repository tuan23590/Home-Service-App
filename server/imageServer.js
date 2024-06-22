import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Cấu hình để lưu trữ tệp và đặt tên tệp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Bộ lọc để chỉ chấp nhận tệp hình ảnh
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Sử dụng middleware cors
app.use(cors());

// Đưa ra cấu hình để cung cấp truy cập đến thư mục chứa ảnh đã tải lên
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Route xử lý upload
app.post('/upload', upload.single('hinhAnh'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({ path: `/uploads/${req.file.filename}` });
});

// Route để lấy danh sách ảnh đã tải lên
app.get('/list-images', (req, res) => {
    const uploadsDir = join(__dirname, 'uploads');
    // Đọc danh sách các file trong thư mục uploads/
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Tạo mảng các đường dẫn của các file ảnh
        const imagePaths = files.map(file => ({
            path: `/uploads/${file}`
        }));

        res.json(imagePaths);
    });
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
