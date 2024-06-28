import { GraphQLrequest } from "./request";

export const apiPhucHoiDuLieu = async (backupFileName) => {
    const query = `query Query($backupFileName: String) {
  PhucHoiDuLieu(backupFileName: $backupFileName)
}`;
   
    const {PhucHoiDuLieu} = await GraphQLrequest({query, variables: {backupFileName}});
    return PhucHoiDuLieu;
  };


export const apiTaoSaoLuu = async () => {
    const query = `query Query {
  SaoLuuDuLieu
}`;
   
    const {SaoLuuDuLieu} = await GraphQLrequest({query});
    return SaoLuuDuLieu;
  };