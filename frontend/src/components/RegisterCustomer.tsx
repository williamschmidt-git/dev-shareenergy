import React, { useContext, useEffect, useState } from 'react';
import { createCustomer, Customer } from '../http/requests/Customers';
import CustomerContext from '../context/customer';

export default function RegisterFunction() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    address: '',
    phone_number: '',
    customer_name: '',
    cpf: '',
    email: '',
  });
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [isCustomerCreated, setIsCustomerCreated] = useState<boolean>(false);

  const { state, setState } = useContext(CustomerContext);

  const requestApi = async () => {
    createCustomer(newCustomer);
  };

  useEffect(() => {
    if (isCustomerCreated) requestApi();
  }, [setNewCustomer, newCustomer]);

  const createNewCustomer = () => {
    const customer: Customer = {
      address,
      phone_number: phoneNumber,
      customer_name: customerName,
      cpf,
      email,
    };

    return customer;
  };

  const callCreateCustomer = async () => {
    setShowModal(false);
    setNewCustomer(createNewCustomer());
    setState([...state, createNewCustomer()]);
    setIsCustomerCreated(true);
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/6 h-10"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Register new customer

      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-600">
                    Register Customer
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="my-4 text-slate-500 text-lg leading-relaxed flex justify-center flex-col">

                    <label className="mx-2" htmlFor="name">
                      <input
                        type="text"
                        className="border rounded-lg mb-3 px-1 text-start"
                        placeholder="Name"
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </label>

                    <label className="mx-2" htmlFor="email">
                      <input
                        type="text"
                        className="border rounded-lg mb-3 px-1 "
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>

                    <label className="mx-2" htmlFor="address">
                      <input
                        type="text"
                        className="border rounded-lg mb-3 px-1 "
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </label>

                    <label className="mx-2" htmlFor="phonenumber">
                      <input
                        type="text"
                        className="border rounded-lg mb-3 px-1 "
                        placeholder="Cellphone"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </label>

                    <label className="mx-2" htmlFor="cpf">
                      <input
                        type="text"
                        className="border rounded-lg mb-3 px-1 "
                        placeholder="CPF"
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </label>

                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => callCreateCustomer()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}
