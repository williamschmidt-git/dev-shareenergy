import axios from "axios";

export interface Customer {
  email: string;
  address: string;
  phone_number: string;
  customer_name: string;
  cpf: string;
}

export const createCustomer = async (customer: Customer) => {

  const options = {
    method: 'POST',
    url: `${process.env.BACKEND}/customers`,
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

export const apiReqDeleteCustomer = async (email: string) => {
  const options = {
    method: 'DELETE',
    url: `${BACKEND_URI}/from/${email}`,
    headers: {
      'content-type': 'application/json'
    },
  };

  const response = await axios(options)

  return response;
}

export const apiReqUpdateCustomer = async (customer: Customer, email: string) => {
  const options = {
    method: 'PUT',
    url: `${BACKEND_URI}/from/${email}`,
    data: customer,
    headers: {
      'content-type': 'application/json'
    },
  }

  const response = await axios(options)
  console.log(response);

  return response;
}