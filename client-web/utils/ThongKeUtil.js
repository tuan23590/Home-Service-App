import { GraphQLrequest } from "./request";

export const apiThongKe = async (idLichThucHien, lyDoDungLich) => {
    const query = `query Query {
  ThongKe
}
    `;
    const { ThongKe } = await GraphQLrequest({
        query
    });
    return JSON.parse(ThongKe);
};