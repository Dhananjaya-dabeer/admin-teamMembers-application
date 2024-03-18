import React, { useState } from "react";
import ProductContext from "./productContext";
const ProductContextProvider = ({ children }) => {
  const [uniqueElement, setUniqueElement] = useState(null);
  return (
    <ProductContext.Provider value={{ uniqueElement, setUniqueElement }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
