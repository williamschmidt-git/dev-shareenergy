import { Dispatch, SetStateAction}  from "react";

export type UserType =  {
  username: string;
  password: string;
}

export type PropsUserContext = {
  state: UserType;
  setState: Dispatch<SetStateAction<UserType>>;
}