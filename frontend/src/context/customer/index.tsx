import { createContext} from "react";
import { PropsCustomerContext } from "../../@types/customer";

export const DEFAULT_VALUE = {
  state: [
    {
      customer_name: '',
      email: '',
      cpf: '',
      phone_number: '',
      address: ''
    }
  ],
  setState: () => {}
}

const CustomerContext = createContext<PropsCustomerContext>(DEFAULT_VALUE)

export default CustomerContext;