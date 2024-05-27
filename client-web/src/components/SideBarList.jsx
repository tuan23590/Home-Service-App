import { Card, CardContent, List, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBarList = ({listItem}) => {
    return (
        <List sx={{
            backgroundColor: '#000000',
            opacity: 0.8,
            height: '93%',
            borderRadius: '20px',
            padding: '20px',
            margin: '10px',
          }}
          subheader={
          <>
          <Typography variant='h5' style={{color: 'white', textAlign: 'center',marginBottom: '10px'}}>Admin</Typography>
          <hr></hr>
          </>
        }
          >
            {listItem.map(({link, text}) => {
                return (
                    <Link 
                    to={`./${link}`}
                    style={{ textDecoration: 'none' }}
                    >
                        <Card sx={{mb: '5px'}}>
                            <CardContent sx={{'&:last-child': {pb: '10px'},textAlign: 'center'}}>
                                <Typography>
                                    {text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link> 
                )
            })}
            {/* <Button color="inherit" onClick={() => navigate("../")}>
              <Typography variant='h5'>
              Trang chủ
              </Typography>
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('DanhSachDonHangChoDuyet')}>
              Chờ duyệt
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('DanhSachDonHangDaDuyet')}>
              Đã Duyệt
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đang thực hiện')}>
              Đang thực hiện
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đã hoàn thành')}>
              Đã hoàn thành
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('DanhSachDonHangDaTuChoi')}>
              Đã từ chối
            </Button> */}
          </List>
    );
};

export default SideBarList;