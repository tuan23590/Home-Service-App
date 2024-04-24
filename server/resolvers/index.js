import fakeData from '../fakeData/index.js'
import {DichVuModel} from '../models/index.js';
export const resolvers = {
    Query:{
        DichVus: async ()=>{
            const Dichvus = await DichVuModel.find();
            return Dichvus;
        },
        // productByProductId: async (parent,args)=>{
        //     const productId = args.productId;
        //     const foundProduct = await ProductModel.findOne({
        //         _id: productId
        //     });
        //     return foundProduct;
        // },
        // productsByCategoryId: async (parent,args)=>{
        //     const categoryId = args.categoryId;
        //     const foundProducts = await ProductModel.find({
        //         categoryId: categoryId
        //     });
        //     return foundProducts;
        // },
        // categorys: async()=>{
        //     const categorys = await CategoryModel.find({level: 0});
        //     return categorys;
        // }
    },
    // Category:{
    //     category: async (parent,args)=> {
    //   const childrenIds = parent.childrenId;
    //   const foundListCategory = await CategoryModel.find({ _id: { $in: childrenIds }});
    //   return foundListCategory;
    //         }
    // },
    // Product:{
    //     category: async (parent,args)=> {
    //     const categoryIds = parent.categoryId;
    //     const foundListCategory = await CategoryModel.find({ _id: { $in: categoryIds }});
    //     console.log(foundListCategory)
    //     return foundListCategory;
    //     },
    // },
    Mutation: {
        addDichVu: async (parent,args)=>{
            const newDichVu = args;
            const DichVu = new DichVuModel(newDichVu);
            await DichVu.save();
            return DichVu;
        },
    }
};
