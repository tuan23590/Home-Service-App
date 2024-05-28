import { GRAPHQL_SERVER } from "./constants";

export const apiNgungLichThucHien = async (idLichThucHien, lyDoDungLich) => {
    const query = `mutation DungLichThucHien($idLichThucHien: String, $lyDoDungLich: String) {
        dungLichThucHien(idLichThucHien: $idLichThucHien, lyDoDungLich: $lyDoDungLich) {
          lyDoDungLich
          trangThaiLich
        }
      }
    `;
    const res = await fetch(GRAPHQL_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                idLichThucHien,
                lyDoDungLich
            }
        })
    });

    const data = await res.json();
    return data;
};


export const apiTiepTucLichThucHien = async (idLichThucHien) => {
    const query = `mutation TiepTucLichThucHien($idLichThucHien: String) {
        tiepTucLichThucHien(idLichThucHien: $idLichThucHien) {
          trangThaiLich
        }
      }
    `;
    const res = await fetch(GRAPHQL_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                idLichThucHien
            }
        })
    });

    const data = await res.json();
    return data;
};