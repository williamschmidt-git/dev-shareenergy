import { useContext, useState } from "react";
import { GlobalStateInterface } from "../../@types/user";
import Context from "../context";

const Provider = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);

  return(
    <Context.Provider value={{ state, setState}}>
      {children}
    </Context.Provider>
  )
}

const useGlobalState = () => {
  const context = useContext(Context);
  if(!context) {
    throw new Error("GlobalState must be used within a GlobalContext");
  }

  return context;
}

export { Provider, useGlobalState }