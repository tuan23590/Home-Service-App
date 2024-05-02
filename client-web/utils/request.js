import { GRAPHQL_SERVER } from "./constants";

export const GraphQLrequest = async (payLoad,options ={})=>{
      const res = await fetch(`${GRAPHQL_SERVER}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options,
        },
        body: JSON.stringify(payLoad)
      });
      if(!res.ok){
        if(res.status === 403)
        {
          return null;
        }
      }
      const {data} = await res.json();
      return data;
};