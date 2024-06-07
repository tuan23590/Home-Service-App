import { GraphQLrequest } from "./request";

export const apiNgungLichThucHien = async (idLichThucHien, lyDoDungLich) => {
    const query = `mutation DungLichThucHien($idLichThucHien: String, $lyDoDungLich: String) {
        dungLichThucHien(idLichThucHien: $idLichThucHien, lyDoDungLich: $lyDoDungLich) {
          lyDoDungLich
          trangThaiLich
        }
      }
    `;
    const { dungLichThucHien } = await GraphQLrequest({
        query,
        variables: {
            idLichThucHien,
            lyDoDungLich
        }
    });
    return dungLichThucHien;
};


export const apiTiepTucLichThucHien = async (idLichThucHien) => {
    const query = `mutation TiepTucLichThucHien($idLichThucHien: String) {
        tiepTucLichThucHien(idLichThucHien: $idLichThucHien) {
          trangThaiLich
        }
      }
    `;
    const { tiepTucLichThucHien } = await GraphQLrequest({
        query,
        variables: {
            idLichThucHien
        }
    });
    return tiepTucLichThucHien;
};