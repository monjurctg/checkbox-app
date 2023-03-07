import React, {useState} from "react";

const CheckboxContext = React.createContext();

const CheckboxProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  return (
    <CheckboxContext.Provider value={{auth, setAuth}}>
      {children}
    </CheckboxContext.Provider>
  );
};

export {CheckboxProvider, CheckboxContext};
