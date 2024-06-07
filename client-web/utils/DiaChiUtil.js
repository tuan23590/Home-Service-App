import { GraphQLrequest } from "./request";
export const apiTinhTP = async () => {
    const query = `query DanhSachTinhTp {
        DanhSachTinhTp {
        name_with_type
          code
        }
      }`;
    const {DanhSachTinhTp} = await GraphQLrequest({query});
    return DanhSachTinhTp;
};

export const apiXaPhuong = async (idQuanHuyen) => {
    const query = `query DanhSachXaPhuong($idQuanHuyen: String) {
        DanhSachXaPhuong(idQuanHuyen: $idQuanHuyen) {
        name_with_type
          code
        }
      }`;
    const {DanhSachXaPhuong} = await GraphQLrequest({query, variables: {idQuanHuyen}});
    return DanhSachXaPhuong;
};

export const apiQuanHuyen = async (idTinhTp) => {
    const query = `query DanhSachQuanHuyen($idTinhTp: String) {
        DanhSachQuanHuyen(idTinhTP: $idTinhTp) {
        name_with_type
          code
        }
      }`;
    const {DanhSachQuanHuyen} = await GraphQLrequest({query, variables: {idTinhTp}});
    return DanhSachQuanHuyen;
};