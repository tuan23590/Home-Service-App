import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import { uploadFile, deleteFile } from '../../utils/HinhAnhUtils';
import ClearIcon from '@mui/icons-material/Clear';

const FileUpload = ({ accept, onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedFilePath, setUploadedFilePath] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            // Clean up function to delete the uploaded file if component unmounts
            if (uploadedFilePath) {
                deleteUploadedFile();
            }
        };
    }, [uploadedFilePath, accept]);

    const deleteUploadedFile = () => {
        const filename = uploadedFilePath.substring(uploadedFilePath.lastIndexOf('/') + 1);
        deleteFile(accept === 'image/*' ? 'image' : 'document', filename)
            .then(() => {
                setUploadedFilePath(''); // Reset uploaded file path
                console.log('File deleted successfully');
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Clear file input
                }
            })
            .catch(error => {
                console.error('Error deleting file: ', error);
            });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);

            // Delete previously uploaded file
            if (uploadedFilePath) {
                console.log('Deleting previously uploaded file: ', uploadedFilePath);
                deleteUploadedFile();
            }

            uploadFile(file, accept === 'image/*' ? 'image' : 'document')
                .then(response => {
                    setUploadedFilePath(response.data.path); // Store the path of the uploaded file
                    setUploading(false);
                    onUploadSuccess(response.data.path);
                })
                .catch(error => {
                    console.error('Error uploading file: ', error);
                    setUploading(false);
                });
        }
    };

    return (
        <div>
            <TextField
                type="file"
                inputProps={{ accept }}
                onChange={handleFileChange}
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {uploading && <CircularProgress size={20} />}
                            {uploadedFilePath && (
                                <IconButton edge="end" onClick={deleteUploadedFile}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
                inputRef={fileInputRef}
            />
        </div>
    );
};

export default FileUpload;
