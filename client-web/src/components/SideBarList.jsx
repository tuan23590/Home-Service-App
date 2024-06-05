import { Card, CardContent, List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SideBarList = ({ listItem }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const handleItemClick = (index) => {
        setSelectedItem(index);
    };
    const selectedPath = useLocation().pathname.split('/')[2];
    return (
        <List
            sx={{
                backgroundColor: '#000000',
                opacity: 0.8,
                height: '93%',
                borderRadius: '20px',
                padding: '20px',
                margin: '10px',
            }}
            subheader={
                <>
                    <Typography variant='h5' style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>Admin</Typography>
                    <hr></hr>
                </>
            }
        >
            {listItem.map(({ link, text }, index) => (
                <Link
                    to={`./${link}`}
                    style={{ textDecoration: 'none' }}
                    key={index}
                    onClick={() => handleItemClick(index)} // Thêm hàm xử lý khi item được click
                >
                    <Card
                        sx={{
                            mb: '5px',
                            background: selectedPath == link ? 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))' : '#000000',
                        }}
                    >
                        <CardContent sx={{ '&:last-child': { pb: '10px' }, textAlign: 'center' }}>
                            <Typography sx={{color: 'white'}}>
                                {text}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </List>
    );
};

export default SideBarList;
