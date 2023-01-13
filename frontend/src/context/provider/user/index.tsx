import { useState } from "react"
import UserContext, { DEFAULT_VALUE}  from "../../user";

interface Props {
  children: React.ReactNode
}

const UserProvider: React.FC<Props> = ({children} : Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state)

  return (
    <UserContext.Provider value={{
      state,
      setState
      }}
    >
      { children }
    </UserContext.Provider>
  );
};

export { UserProvider };