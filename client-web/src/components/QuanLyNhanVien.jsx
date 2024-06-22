import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const QuanLyNhanVien = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        // Gọi hàm để lấy danh sách ảnh khi component được tải lần đầu
        fetchUploadedImages();
    }, []); // Khi dependencies là mảng rỗng, useEffect chỉ gọi một lần khi component được render lần đầu

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('hinhAnh', selectedFile);

        axios.post('http://localhost:3000/upload', formData)
            .then(response => {
                console.log(response.data); // log the response from server
                // Sau khi upload thành công, cập nhật danh sách ảnh bằng cách gọi lại hàm fetchUploadedImages()
                fetchUploadedImages();
            })
            .catch(error => {
                console.error('Error uploading file: ', error);
                // Xử lý lỗi khi upload
            });
    };

    const fetchUploadedImages = () => {
        axios.get('http://localhost:3000/list-images')
            .then(response => {
                setUploadedImages(response.data); // Cập nhật danh sách ảnh từ phản hồi của server
            })
            .catch(error => {
                console.error('Error fetching images: ', error);
                // Xử lý lỗi khi lấy danh sách ảnh
            });
    };

    return (
        <div>
            <Typography variant="h6">
                Quản lý nhân viên
            </Typography>
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload
            </Button>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Danh sách ảnh đã tải lên:
            </Typography>
            <List>
                {uploadedImages.map(image => (
                    <ListItem key={image.path}>
                        <ListItemText primary={image.path} />
                        <img src={`http://localhost:3000${image.path}`} alt="Uploaded" style={{ width: '100px', height: 'auto', marginLeft: '20px' }} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default QuanLyNhanVien;
