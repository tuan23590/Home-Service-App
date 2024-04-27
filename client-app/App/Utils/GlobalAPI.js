import { request, gql } from 'graphql-request'



const MASTER_URL = 'https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master'

const getSlider=async()=>{
const query = gql`
query GetSlider {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`
const result = await request(MASTER_URL, query)
return result;
}


getCategory=async()=>{
    const query = gql`
    query getCategory {
        categories {
          id
          name
          type
          icon {
            url
          }
        }
      }   
    `
    const result = await request(MASTER_URL, query)
    return result;
}


const getDiscovers=async()=>{ 
  const query = gql`
  query getDiscover {
    discovers {
      name
      image {
        url
      }
    }
  }     
  `
  const result = await request(MASTER_URL, query)
  return result;
}
const getDichVus=async()=>{ 
  const query = gql`
  query Query {
    DichVus {
      tenDichVu
      maDichVu
      moTaDichVu
      gia
      thoiGian
      icon
      iconSelected
    }
  }         
  `
  const result = await request("http://localhost:4000/graphql", query)
  return result;
}


export default {
    getSlider,
    getCategory,
    getDiscovers,
    getDichVus
};


