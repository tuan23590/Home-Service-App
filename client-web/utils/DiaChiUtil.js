const API_URL = 'http://localhost:4000/graphql'

export const apiTinhTP = async () => {
    const query = `query DanhSachTinhTp {
        DanhSachTinhTp {
        name_with_type
          code
        }
      }`;

    const res = await fetch(API_URL, {
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

export const apiXaPhuong = async (idQuanHuyen) => {
    const query = `query DanhSachXaPhuong($idQuanHuyen: String) {
        DanhSachXaPhuong(idQuanHuyen: $idQuanHuyen) {
        name_with_type
          code
        }
      }`;

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { idQuanHuyen }
        })
    });

    const data = await res.json();
    return data;
};

export const apiQuanHuyen = async (idTinhTp) => {
    const query = `query DanhSachQuanHuyen($idTinhTp: String) {
        DanhSachQuanHuyen(idTinhTP: $idTinhTp) {
        name_with_type
          code
        }
      }`;

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { idTinhTp }
        })
    });

    const data = await res.json();
    return data;
};