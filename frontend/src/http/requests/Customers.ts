import axios from 'axios';

// import * as dotenv from 'dotenv';

export const api = {
  backend_url: import.meta.env.VITE_BACKEND_REQUEST,
};

export interface Customer {
  email: string;
  address: string;
  phone_number: string;
  customer_name: string;
  cpf: string;
}

// const BACKEND_URI = 'https://teal-wheel-production.up.railway.app'

export const createCustomer = async (customer: Customer) => {
  const options = {
    method: 'POST',
    url: `${api.backend_url}/customers`,
    headers: {
      'content-type': 'application/json',
    },
    data: {
      email: customer.email,
      phone_number: customer.phone_number,
      address: customer.address,
      customer_name: customer.customer_name,
      cpf: customer.cpf,
    },
  };

  const response = await axios(options);
  return response;
};

export const getCustomers = async () => {
  const options = {
    method: 'GET',
    url: `${api.backend_url}/customers`,
    headers: {
      'content-type': 'application/json',
    },
  };

  const { data } = await axios(options);

  return data.customers;
};

export const apiReqDeleteCustomer = async (email: string) => {
  const options = {
    method: 'DELETE',
    url: `${api.backend_url}/customers/from/${email}`,
    headers: {
      'content-type': 'application/json',
    },
  };

  const response = await axios(options);

  return response;
};

export const apiReqUpdateCustomer = async (customer: Customer, email: string) => {
  const options = {
    method: 'PUT',
    url: `${api.backend_url}/customers/from/${email}`,
    data: customer,
    headers: {
      'content-type': 'application/json',
    },
  };

  const response = await axios(options);

  return response;
};
