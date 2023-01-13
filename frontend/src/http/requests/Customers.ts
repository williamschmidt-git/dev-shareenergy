import axios from "axios";

export interface Customer {
  email: string;
  address: string;
  phone_number: string;
  customer_name: string;
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
      email: customer.email,
      phone_number: customer.phone_number,
      address: customer.address,
      customer_name: customer.customer_name,
      cpf: customer.cpf
    }
  }

  const response = await axios(options)
  console.log(response)
}

export const getCustomers = async () => {
  const options = {
    method: 'GET',
    url: BACKEND_URI,
    headers: {
      'content-type': 'application/json'
    },
  };

  const {data} = await axios(options);

  return data.customers;
}