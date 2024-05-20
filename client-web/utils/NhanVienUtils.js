export const NhanVienLoader = async () => {
    const query = `query MyQuery {
      nhanViens {
        id
        ten
        hinhAnh {
          id
        }
      }
    }`;

    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    return data;
  };

  const fetchNhanViens = async () => {
    try {
      const responseData = await NhanVienLoader();
      setNhanViens(responseData.data.nhanViens);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  