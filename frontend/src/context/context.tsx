import { createContext, Dispatch, SetStateAction } from "react";
import { GlobalStateInterface } from "../@types/user";

const Context = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>
})

export default Context;