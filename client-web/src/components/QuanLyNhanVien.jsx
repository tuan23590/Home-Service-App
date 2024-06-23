import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import FileUpload from './FileUpload';
import { fetchUploadedImages, fetchUploadedDocuments, deleteFile } from '../../utils/HinhAnhUtils';

const QuanLyNhanVien = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);

    useEffect(() => {
        fetchUploadedImages()
            .then(response => setUploadedImages(response.data))
            .catch(error => console.error('Error fetching images: ', error));

        fetchUploadedDocuments()
            .then(response => setUploadedDocuments(response.data))
            .catch(error => console.error('Error fetching documents: ', error));
    }, []);

    const handleImageUploadSuccess = (filePath) => {
        console.log('Uploaded image path: ', filePath);
        fetchUploadedImages()
            .then(response => setUploadedImages(response.data))
            .catch(error => console.error('Error fetching images: ', error));
    };

    const handleDocumentUploadSuccess = (filePath) => {
        console.log('Uploaded document path: ', filePath);
        fetchUploadedDocuments()
            .then(response => setUploadedDocuments(response.data))
            .catch(error => console.error('Error fetching documents: ', error));
    };

    const handleDeleteFile = (fileType, path) => {
        const filename = path.substring(fileType === 'image' ? '/uploads/images/'.length : '/uploads/files/'.length);
        deleteFile(fileType, filename)
            .then(data => {
                if (fileType === 'image') {
                    setUploadedImages(data);
                } else {
                    setUploadedDocuments(data);
                }
            })
            .catch(error => console.error(`Error deleting ${fileType}: `, error));
    };

    return (
        <div>
            <Typography variant="h6">
                Quản lý nhân viên
            </Typography>
            <FileUpload
                accept="image/*"
                onUploadSuccess={handleImageUploadSuccess}
            />
            <FileUpload
                accept=""
                onUploadSuccess={handleDocumentUploadSuccess}
            />

            {/* <Typography variant="h6" style={{ marginTop: '20px' }}>
                Danh sách ảnh đã tải lên:
            </Typography>
            <List>
                {uploadedImages.map(image => (
                    <ListItem key={image.path}>
                        <ListItemText primary={image.path} />
                        <img src={`http://localhost:3000${image.path}`} alt="Uploaded" style={{ width: '100px', height: 'auto', marginLeft: '20px' }} />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteFile('image', image.path)}
                        >
                            Xóa
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Danh sách tài liệu đã tải lên:
            </Typography>
            <List>
                {uploadedDocuments.map(document => (
                    <ListItem key={document.path}>
                        <ListItemText primary={document.path} />
                        <a href={`http://localhost:3000${document.path}`} target="_blank" rel="noopener noreferrer">Xem tài liệu</a>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteFile('document', document.path)}
                        >
                            Xóa
                        </Button>
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
};

export default QuanLyNhanVien;
