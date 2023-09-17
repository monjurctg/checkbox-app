import React, {useState} from "react";

const CheckboxContext = React.createContext();

const CheckboxProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  const [DetailsBottomSheet, setDetailsBottomSheet] = useState(false);
  
  

  return (
    <CheckboxContext.Provider
      value={{auth, DetailsBottomSheet, setDetailsBottomSheet, setAuth}}>
      {children}
    </CheckboxContext.Provider>
  );
};

export {CheckboxProvider, CheckboxContext};
