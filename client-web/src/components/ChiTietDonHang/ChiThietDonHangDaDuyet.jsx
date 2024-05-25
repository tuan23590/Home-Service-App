import { Button, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiTuChoiDonHang, themNhanVienVaoDonHang } from '../../../utils/DonHangUtils';
import { apiDanhSachNhanVienNhanDonHang } from '../../../utils/NhanVienUtils';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
const ChiTietDonHang = () => {
    const selectedOrder = useOutletContext();
    const [danhSachNhanVienNhanDonHang, setDanhSachNhanVienNhanDonHang] = useState([]);
    const [nhanVienDaChon, setNhanVienDaChon] = useState(null);
    const navigate = useNavigate();
    const formatDate = (epochTime) => {
        // Tạo một đối tượng Date từ thời gian Epoch (milliseconds)
        const date = new Date(epochTime * 1000);
      
        // Lấy thông tin về giờ, phút, ngày, tháng và năm từ đối tượng Date
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();
      
        // Tạo chuỗi định dạng ngày giờ
        const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
      
        return formattedDateTime;
      };
      useEffect(() => {
        const fetchData = async () => {
          if (selectedOrder && selectedOrder.id) {
            try {
              const { data } = await apiDanhSachNhanVienNhanDonHang(selectedOrder.id);
              setDanhSachNhanVienNhanDonHang(data.DanhSachNhanVienTrongViec);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        };
    
        fetchData();
      }, [selectedOrder]);

      const StyledCard = styled(Card)(({ selected }) => ({
        cursor: 'pointer',
        margin: '10px',
        border: selected ? '2px solid #3f51b5' : '1px solid #ccc',
        boxShadow: selected ? '0 0 10px rgba(63, 81, 181, 0.5)' : 'none',
      }));

      const EmployeeCard = ({ employee, onSelect, selected }) => {
        return (
          <StyledCard onClick={() => onSelect(employee.id)} selected={selected}>
            <CardContent>
              <Typography variant="h5">{employee.tenNhanVien}</Typography>
              <Typography variant="body2">Giới tính: {employee.gioiTinh}</Typography>
              <Typography variant="body2">Ngày sinh: {employee.ngaySinh}</Typography>
              <Typography variant="body2">Số điện thoại: {employee.soDienThoai}</Typography>
              <Typography variant="body2">Email: {employee.email}</Typography>
              <Typography variant="body2">Chuyên môn: {employee.dichVu.map(dv => dv.tenDichVu).join(', ')}</Typography>
              <Typography variant="body2">Ghi chú: {employee.ghiChu}</Typography>
              <Typography variant="body2">Đánh giá: {employee.danhGia}</Typography>
              <Typography variant="body2">Trạng thái: {employee.trangThaiHienTai}</Typography>
            </CardContent>
          </StyledCard>
        );
      };
      
      const EmployeeList = ({ employees, onSelect, selectedEmployeeId }) => {
        return (
          <Grid container>
            {employees.map((employee) => (
              <Grid item xs={12} sm={6} md={4} key={employee.id}>
                <EmployeeCard
                  employee={employee}
                  onSelect={onSelect}
                  selected={employee.id === selectedEmployeeId}
                />
              </Grid>
            ))}
          </Grid>
        );
      };
    
      const duyetDonHang = async () => {
        const {data} = await themNhanVienVaoDonHang(selectedOrder.id, [nhanVienDaChon]);
        if (data.themNhanVienVaoDonHang !== null) {
          alert('Duyệt đơn hàng thành công');
          window.location.reload();
        }else{
          alert('Duyệt đơn hàng thất bại');
        }
      };
      const TuChoiDonHang = async () => {
        const confirmAction = window.confirm('Bạn có chắc chắn muốn từ chối đơn hàng không?');
        if (confirmAction) {
          const data = await apiTuChoiDonHang(selectedOrder.id);
          if (data !== null) {
            alert('Từ chối đơn hàng thành công');
            window.location.reload();
          }
        }
      };
      console.log(selectedOrder);
    return (
        <div>
             <Grid item xs={12} sm={8}>
              <Paper style={{ padding: 20, border: '1px solid black', height: '92vh', overflow: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                  Thông tin đơn hàng
                </Typography>
                {selectedOrder && (
                  <div>
                    <Typography variant="body1" gutterBottom>
                      Mã đơn hàng: {selectedOrder.maDonHang}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Thời gian tạo đơn: {formatDate(selectedOrder.ngayDatHang)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Số giờ thực hiện: {selectedOrder.soGioThucHien} giờ
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Thời gian bắt đầu: {formatDate(selectedOrder.ngayBatDau)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Thời gian kết thúc: {formatDate(selectedOrder.ngayKetThuc)}
                    </Typography>
                   
                   
                    
                    <Typography variant="body1" gutterBottom>
                      Địa chỉ: {[
                        selectedOrder.diaChi.soNhaTenDuong,
                        selectedOrder.diaChi.xaPhuong,
                        selectedOrder.diaChi.quanHuyen,
                        selectedOrder.diaChi.tinhTP,
                      ].join(', ')}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Ghi chú địa chỉ: {selectedOrder.diaChi.ghiChu}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Vật nuôi: {selectedOrder.vatNuoi}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Ghi chú đon hàng: {selectedOrder.ghiChu}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Trạng thái đơn hàng: {selectedOrder.trangThaiDonHang}
                    </Typography>
                    <Typography>Tổng tiền: {selectedOrder.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
                    <Typography variant="h5" gutterBottom>
                      Thông tin khách hàng:
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Tên khách hàng: {selectedOrder.khachHang.tenKhachHang}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Số điện thoại: {selectedOrder.khachHang.soDienThoai}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Email: {selectedOrder.khachHang.email}
                    </Typography>
                    <Typography variant="h5">Thông tin nhân viên</Typography>
                    <Typography variant="body1">Tên: {selectedOrder.nhanVien[0].tenNhanVien}</Typography>
                    <Typography variant="body1">Giới tính: {selectedOrder.nhanVien[0].gioiTinh}</Typography>
                    <Typography variant="body1">Ngày sinh: {selectedOrder.nhanVien[0].ngaySinh}</Typography>
                    <Typography variant="body1">Địa chỉ: {selectedOrder.nhanVien[0].diaChi}</Typography>
                    <Typography variant="body1">Số điện thoại: {selectedOrder.nhanVien[0].soDienThoai}</Typography>
                    <Typography variant="body1">Email: {selectedOrder.nhanVien[0].email}</Typography>
                    <Typography variant="body1">CCCD: {selectedOrder.nhanVien[0].cccd}</Typography>
                    <Typography variant="body1">Dịch vụ: {selectedOrder.nhanVien[0].dichVu.map(dv => dv.tenDichVu).join(", ")}</Typography>
                    <Typography variant="body1">Ghi chú: {selectedOrder.nhanVien[0].ghiChu}</Typography>
                    <Typography variant="body1">Đánh giá: {selectedOrder.nhanVien[0].danhGia}</Typography>
                    <Typography variant="body1">Trạng thái hiện tại: {selectedOrder.nhanVien[0].trangThaiHienTai}</Typography>

                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="h6" gutterBottom>
                      Dịch vụ đã đặt
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tên Dịch vụ</TableCell>
                            <TableCell>Loại Dịch Vụ</TableCell>
                            <TableCell>Giá tiền</TableCell>
                            <TableCell>Số lần lập lại</TableCell>
                            <TableCell>Thành tiền</TableCell>
                            <TableCell>Ghi chú</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder && Array.isArray(selectedOrder.danhSachDichVu) ? (
                            selectedOrder.danhSachDichVu.map((service, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {service.tenDichVu} 
                                 
                                </TableCell>
                                <TableCell>
                                  {service.loaiDichVu === "DichVuThem" ? "Dịch vụ thêm" : 
                                  service.loaiDichVu === "CaLe" ? "Ca lẽ" : service.loaiDichVu}
                                </TableCell>
                                <TableCell>
                                  {service.loaiDichVu === "DichVuThem" && " + "}
                                  {service.gia === null ? `${service.thoiGian} Giờ` : `${service.gia.toLocaleString('vi-VN')} VNĐ`}
                                </TableCell>
                                <TableCell>
                                  {selectedOrder && selectedOrder.danhSachLichThucHien ? selectedOrder.danhSachLichThucHien.length : 0} lần
                                </TableCell>
                                <TableCell>
                                  {service.loaiDichVu === "DichVuThem" && " + "}
                                  {selectedOrder && selectedOrder.danhSachLichThucHien ? 
                                    (selectedOrder.danhSachLichThucHien.length * (service.gia === null ? service.thoiGian : service.gia)).toLocaleString('vi-VN') + 
                                      (service.gia === null ? " giờ" : " VNĐ") 
                                    : "0"}
                                </TableCell>
                                <TableCell>
                                  {service.loaiDichVu !== "DichVuThem" && "(Dịch vụ chính)"}
                                  {service.loaiDichVu === "DichVuThem" && service.thoiGian && " (Đã cộng vào dịch vụ chính)"}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7}>Không có dịch vụ đã đặt</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    



                    {/* <div>
                      <Typography variant="h4" gutterBottom>Danh sách nhân viên</Typography>
                      <EmployeeList
                        employees={danhSachNhanVienNhanDonHang}
                        onSelect={setNhanVienDaChon}
                        selectedEmployeeId={nhanVienDaChon}
                      />
                    </div> */}
                       <Typography variant="h6" gutterBottom>
                      Danh sách lịch thực hiện
                        </Typography> 

                      <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Thời gian bắt đầu</TableCell>
                                  <TableCell>Thời gian kết thúc</TableCell>
                                  <TableCell>Trạng thái lịch</TableCell>
                                  <TableCell>Thao tác</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {selectedOrder.danhSachLichThucHien.map((schedule, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{formatDate(schedule.thoiGianBatDauLich)}</TableCell>
                                    <TableCell>{formatDate(schedule.thoiGianKetThucLich)}</TableCell>
                                    <TableCell>{schedule.trangThaiLich}</TableCell>
                                    <TableCell>
                                      <Button variant="outlined" color="error" size='small' onClick={() => navigate(`/lich-thuc-hien/${schedule.id}`)}>Ngưng lịch</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>



                    
                    {/* <Button variant="contained" color="success" onClick={duyetDonHang}>Duyệt Đơn Hàng</Button>
                    <Button variant="contained" onClick={TuChoiDonHang}>Từ Chối Đơn Hàng</Button> */}
                  </div>
                )}
              </Paper>
            </Grid>
        </div>
    );
};

export default ChiTietDonHang;