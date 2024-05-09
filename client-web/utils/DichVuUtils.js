export const DBDataDichVu = async () => {
    const query = `query Query {
      dichVus {
        id
        tenDichVu
        thoiGianLamViec
        giaTien
        }
      }`;
    
    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
  
    const data = await res.json();
    return data;
  };