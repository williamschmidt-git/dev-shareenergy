import { createContext} from "react";
import { PropsUserContext } from "../../@types/user";

export const DEFAULT_VALUE = {
  state: {
    username: '',
    password: ''
  },
  setState: () => {}
}

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE)

export default UserContext;