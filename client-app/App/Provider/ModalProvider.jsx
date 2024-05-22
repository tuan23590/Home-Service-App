import React, { createContext, useEffect, useState } from 'react';


export const ModalContext = createContext();
export default function ModalProvider({ children }) {
    const [isModal1Visible, setModal1Visible] = useState(false);
    const [isModal2Visible, setModal2Visible] = useState(false);
    const [isModal3Visible, setModal3Visible] = useState(false);
    const [isModal4Visible, setModal4Visible] = useState(false);
  return (
    <ModalContext.Provider value={{ 
        isModal1Visible, 
        setModal1Visible,
        isModal2Visible,
        setModal2Visible,
        isModal3Visible,
        setModal3Visible,
        isModal4Visible,
        setModal4Visible
     }}>
      {children}
    </ModalContext.Provider>
  );
};