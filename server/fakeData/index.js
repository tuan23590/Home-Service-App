export default {
    categorys: [
        { id: "1", name: "category 1",description: 'description category 1' },
        { id: "2", name: "category 2",description: 'description category 2' },
        { id: "3", name: "category 3",description: 'description category 3' }
    ],
    products: [
        {
            id: "1",
            name: "Product 1",
            quantity: 123,
            price: 10.99,
            description: 'product description 1',
            categoryId: "2"
        },
        {
            id: "2",
            name: "Product 2",
            quantity: 122,
            price: 19.99,
            description: 'product description 2',
            categoryId: "1"
        },
        {
            id: "3",
            name: "Product 3",
            quantity: 121,
            price: 7.5,
            description: 'product description 3',
            categoryId: "3"
        },
        {
            id: "4",
            name: "Product 4",
            quantity: 120,
            price: 25.5,
            description: 'product description 4',
            categoryId: "2"
        },
        {
            id: "5",
            name: "Product 5",
            quantity: 100,
            price: 15.75,
            description: 'product description 5',
            categoryId: "1"
        }
    ]
}