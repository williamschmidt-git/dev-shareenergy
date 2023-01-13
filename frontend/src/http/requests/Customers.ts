import axios from "axios";

export interface Customer {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  cpf: string;
}

export const BACKEND_URI = 'http://localhost:3000/customers'

export const createCustomer = async (customer: Customer) => {

  const options = {
    method: 'POST',
    url: BACKEND_URI,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      name: customer.name,
      email: customer.email,
      phone_number: customer.phoneNumber,
      address: customer.address,
      cpf: customer.cpf
    }
  }

  const response = await axios(options)
  console.log(response)
}