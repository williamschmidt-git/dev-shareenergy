import React, {
  useContext, useEffect, useState,
} from 'react';
import CustomerContext from '../context/customer';
import {
  Customer, getCustomers, apiReqDeleteCustomer, apiReqUpdateCustomer,
} from '../http/requests/Customers';
import RegisterFunction from './RegisterCustomer';

export default function AllCustomers() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [modalCustomer, setModalCustomer] = useState<Customer[]>([]);
  const [searchBar, setSearchBar] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [updatedData, setUpdatedData] = useState<Customer>({
    address: '',
    phone_number: '',
    customer_name: '',
    cpf: '',
    email: '',
  });

  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);

  const { state, setState } = useContext(CustomerContext);

  const requestUpdateCustomer = async () => {
    await apiReqUpdateCustomer(updatedData, email);
  };

  useEffect(() => {
    if (isDataUpdated) requestUpdateCustomer();
  }, [updatedData]);

  const filterCustomers = (arrayOfCustomers: Customer[]) => {
    const array = arrayOfCustomers.filter((customer) => customer.customer_name.toLowerCase()
      .includes(searchBar.toLocaleLowerCase()));
    return array;
  };

  const createModalCustomer = (selectedCustomer: Customer) => {
    setModalCustomer([selectedCustomer]);
  };

  const requestCustomers = async () => {
    const response = await getCustomers();
    setState(response);
  };

  useEffect(() => {
    if (state.length < 1) requestCustomers();
  }, [state]);

  const requestDeleteCustomer = async (customerEmail: string) => {
    if (!state.some((e) => e.email.includes(customerEmail))) {
      apiReqDeleteCustomer(customerEmail);
    }
  };

  const deleteCustomer = async (customerEmail: string) => {
    const newCustomersArray = state.filter((element) => !element.email.includes(customerEmail));
    setShowModal(false);
    setShowList(true);
    setState(newCustomersArray.sort());
    await requestDeleteCustomer(customerEmail);
  };

  const updateCustomer = async () => {
    const customer: Customer = {
      address,
      phone_number: phoneNumber,
      customer_name: customerName,
      cpf,
      email,
    };

    const newCustomerArray = state.filter((s) => !s.email.includes(email));

    setShowModalUpdate(false);
    setState([customer, ...newCustomerArray]);
    setUpdatedData(customer);
    setIsDataUpdated(true);
    await requestUpdateCustomer();

    return customer;
  };

  return (
    <>
      <div className="flex justify-center gap-x-2">
        <label htmlFor="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            className="rounded-md p-2 h-10"
            onChange={(e) => setSearchBar(e.target.value)}
          />
        </label>
        <RegisterFunction />

      </div>

      <div className="bg-white w-2/4 rounded-md mx-auto">

        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {showList
          && (
          <table className="">
            <thead>
              <tr className="text-gray-600">
                <th>NAME</th>
                <th>EMAIL</th>
                <th>INFO</th>
              </tr>
            </thead>

            <tbody className="text-gray-400 text-center">
              {
                filterCustomers(state).map((customer) => (
                  <tr key={customer.email} className="border-b border-solid border-slate-200 rounded-t mb-1">
                    <td className="mx-2 py-2 px-1 ">
                      { customer.customer_name }
                    </td>
                    <td className="mx-2 py-2 px-1">
                      { customer.email }
                    </td>
                    <td>
                      <button
                        className="bg-pink-500 rounded-md"
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setShowList(false);
                          createModalCustomer(customer);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFFFFF" viewBox="0 0 256 256">
                          <rect width="26" height="26" fill="none" />
                          <circle cx="116" cy="116" r="84" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                          <line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          )}
        </div>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex  w-full bg-white outline-none focus:outline-none">
                  {/* header */}
                  <div className="flex items-start p-5 border-b border-solid border-slate-200 rounded-t">
                    <table>
                      <thead>
                        {
                      modalCustomer.length !== 0 && modalCustomer.map((e) => (
                        <div key={e.customer_name} className="text-gray-600">
                          <tr className="text-gray-500">
                            Name
                            <th>
                              <td>{e.customer_name}</td>
                            </th>
                          </tr>

                          <tr className="text-gray-500">
                            Email
                            <th>
                              <td>{e.email}</td>
                            </th>
                          </tr>

                          <tr className="text-gray-500">
                            Address
                            <th>
                              <td>{e.address}</td>
                            </th>
                          </tr>

                          <tr className="text-gray-500">
                            Phone
                            <th>
                              <td>{e.phone_number}</td>
                            </th>
                          </tr>

                          <tr className="text-gray-500 ">
                            CPF
                            <th>
                              <td>{e.cpf}</td>
                            </th>
                          </tr>
                          <div className="flex mt-3">
                            <button
                              className="text-white bg-pink-500 rounded-md w-28 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => deleteCustomer(e.email)}
                            >
                              Delete
                            </button>

                            <button
                              className="text-white bg-pink-500 rounded-md w-28 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setShowModalUpdate(true);
                                setShowModal(false);
                                setShowList(false);
                              }}
                            >
                              Update
                            </button>

                            <button
                              className="text-white bg-pink-500 w-28 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                setShowModalUpdate(false);
                                setShowList(true);
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      ))
                    }
                      </thead>
                    </table>
                  </div>

                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
          </>
        ) : null}
        {
          showModalUpdate
            ? (
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/* content */}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* header */}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold text-gray-600">
                        Update Customer
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
                    {/* body */}
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

                        <label className="mx-2" htmlFor="cellphone">
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
                    {/* footer */}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModalUpdate(false);
                          setShowList(true);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          updateCustomer();
                          setShowList(true);
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
      </div>

    </>
  );
}
