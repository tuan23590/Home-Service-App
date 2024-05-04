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


const getCategory=async()=>{
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

const getDichVuThem=async()=>{ 
  
  const query = gql`
  query Query {
    DichVuThem {
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
  const result = await request("http://172.16.133.119:4000/graphql", query)
  return result;
}
const getDichVuCaLe=async()=>{ 
  
  const query = gql`
  query Query {
    DichVuCaLe {
      maDichVu
      moTaDichVu
      gia
      thoiGian
    }
  }        
  `
  const result = await request("http://172.16.133.119:4000/graphql", query)
  return result;
}
export default {
    getSlider,
    getCategory,
    getDiscovers,
    getDichVuThem,
    getDichVuCaLe
};


