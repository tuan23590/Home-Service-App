import axios from 'axios';
import { IMAGE_SERVER } from './constants';

const uploadFile = (file, fileType, onUploadProgress) => {
    const formData = new FormData();
    formData.append(fileType === 'image' ? 'hinhAnh' : 'taiLieu', file);

    return axios.post(`${IMAGE_SERVER}/upload-${fileType}`, formData, {
        onUploadProgress
    });
};

const fetchUploadedImages = () => {
    return axios.get(`${IMAGE_SERVER}/list-images`);
};

const fetchUploadedDocuments = () => {
    return axios.get(`${IMAGE_SERVER}/list-documents`);
};

const deleteFile = (fileType, filename) => {
    const deleteEndpoint = fileType === 'image' ? 'delete-image' : 'delete-document';
    return axios.delete(`${IMAGE_SERVER}/${deleteEndpoint}/${encodeURIComponent(filename)}`)
        .then(response => {
            console.log(`${fileType} deleted successfully`);
            return response.data; // Return the data after successful deletion
        })
        .catch(error => {
            console.error(`Error deleting ${fileType}: `, error);
            throw error;
        });
};

export { uploadFile, fetchUploadedImages, fetchUploadedDocuments, deleteFile };
