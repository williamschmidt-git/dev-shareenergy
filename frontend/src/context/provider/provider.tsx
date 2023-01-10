import { useState } from "react"
import Context, { DEFAULT_VALUE } from "../context"

interface Props {
  children: React.ReactNode
}

const ContextProvider: React.FC<Props> = ({children} : Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state)

  return (
    <Context.Provider value={{
      state,
      setState
      }}
    >
      { children }
    </Context.Provider>
  );
};

export { ContextProvider };