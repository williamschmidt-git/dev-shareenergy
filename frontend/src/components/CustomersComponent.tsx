import React from 'react';
import AllCustomers from './AllCustomersComponent';
import HeaderComponent from './HeaderComponent';

export default function CustomersComponent() {
  return (
    <div className="bg-gray-200 h-screen flex flex-col align-middle justify-items-center">
      <HeaderComponent />
      <h1 className="font-roboto text-center text-4xl pt-14 text-gray-700 mb-4">CUSTOMERS</h1>
      <AllCustomers />
    </div>
  );
}
