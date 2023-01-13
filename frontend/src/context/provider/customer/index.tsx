import { useState } from "react"
import CustomerContext, { DEFAULT_VALUE } from "../../customer";

interface Props {
  children: React.ReactNode
}

const CustomerProvider: React.FC<Props> = ({children} : Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state)

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