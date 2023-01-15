import { useState } from "react"
import { CustomerType } from "../../../@types/customer";
import CustomerContext from "../../customer";

interface Props {
  children: React.ReactNode
}

const CustomerProvider: React.FC<Props> = ({children} : Props) => {
  const [state, setState] = useState<CustomerType>([] as CustomerType);

  return (
    <CustomerContext.Provider value={{
      state,
      setState
      }}
    >
      { children }
    </CustomerContext.Provider>
  );
};

export { CustomerProvider };