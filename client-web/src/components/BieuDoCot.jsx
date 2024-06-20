// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Box, Typography } from '@mui/material';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   datasets: [
//     {
//       label: 'Doanh thu (triệu VND)',
//       data: [120, 150, 180, 200, 170, 190, 220, 250, 210, 230, 240, 100],
//       backgroundColor: '#00b0ff',
//       borderColor: '#01579b',
//       borderWidth: 1,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Biểu đồ Doanh thu các tháng',
//     },
//   },
// };

// const BieuDoCot = ({value}) => {
//   const doanhThu12Thang = value.dataThongKe.doanhThu12Thang

//   return (
//     <Box sx={{ padding: 4}}>
//       <Typography variant="h4" gutterBottom>
//         Thống Kê Doanh Thu
//       </Typography>
//       <Bar data={data} options={options} width={'375px'} />
//     </Box>
//   );
// }

// export default BieuDoCot;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ Doanh thu các tháng',
    },
  },
};

const BieuDoCot = ({ value }) => {
  const doanhThu12Thang = value.dataThongKe.doanhThu12Thang?.map(item => item.doanhThu);
  const data = {
    labels: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    datasets: [
      {
        label: 'Doanh thu (triệu VND)',
        data: doanhThu12Thang,
        backgroundColor: '#00b0ff',
        borderColor: '#01579b',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thống Kê Doanh Thu
      </Typography>
      <Bar data={data} options={options} width={'375px'} />
    </Box>
  );
};

export default BieuDoCot;
