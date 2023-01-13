import { Dispatch, SetStateAction}  from "react";

export type CustomerType =  {
  customer_name: string;
  email: string;
  cpf: string;
  phone_number: string;
  address: string;
}

export type PropsCustomerContext = {
  state: CustomerType[];
  setState: Dispatch<SetStateAction<CustomerType[]>>;
}