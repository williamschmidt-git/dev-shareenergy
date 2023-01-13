import { createContext} from "react";
import { PropsCustomerContext } from "../../@types/customer";

export const DEFAULT_VALUE = {
  state: [
    {
      customer_name: 'delete',
      email: 'delete',
      cpf: 'delete', 
      phone_number: 'delete',
      address: 'delete',
    }
  ],
  setState: () => { }
}

const CustomerContext = createContext<PropsCustomerContext>(DEFAULT_VALUE)

export default CustomerContext;