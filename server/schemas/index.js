// export const typeDefs = `#graphql

// type Product {
//     id: String,
//     description: String,
//     quantity: Int,
//     name: String,
//     price: Float,
//     image: String,
//     category: [Category]
// },
// type Category{
//     id: String,
//     name: String,
//     icon: String,
//     level: Int,
//     category: [Category]
// },
// type Customer{
//     id: String,
//     name: String,
// },
// type Query {
//     products: [Product],
//     categorys:[Category],
//     productByProductId(productId: String): Product
//     productsByCategoryId(categoryId: String): [Product]
// },
// type Mutation {
//     addProduct(name: String!, description: String, quantity: Int,price: Float,image: String, categoryId: String): String,
//     addCategory(name: String,icon: String,level: Int, parentId: String): String,
// }
// `;

export const typeDefs = `#graphql
    type DichVu {
        TenDichVu: String,
        maDichVu: String,
        moTaDichVu: String,
        gia: Int,
        thoiGian: Int,
        icon: String,
        iconSelected: String,
    },
    type Query {
        DichVus: [DichVu],
    },
    type Mutation {
        addDichVu(TenDichVu: String!, maDichVu: String, moTaDichVu: String, gia: Int, thoiGian: Int, icon: String, iconSelected: String): DichVu,
    }
`