import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
export default function Detal() {
  const dataText  = useOutletContext();
  console.log(dataText)
  return (
    <div>
      this is data: {dataText}
      <hr/>
     <Link to={`/test`}>Back</Link>
    </div>
  );
}
