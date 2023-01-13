import { useContext, useEffect, useState } from "react";
import CustomerContext from "../context/customer";
import { Customer, getCustomers, apiReqDeleteCustomer } from "../http/requests/Customers";
import RegisterFunction from "./RegisterCustomer";

export default function AllCustomers() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  // const [state, setState] = useState<Customer[]>([]);
  const [modalCustomer, setModalCustomer] = useState<Customer[]>([]);
  const [searchBar, setSearchBar] = useState<string>("");

  const { state, setState } = useContext(CustomerContext);

  const filterCustomers = (arrayOfCustomers: Customer[]) => {
    return arrayOfCustomers.filter((customer) => {
      return customer.customer_name.toLowerCase().includes(searchBar.toLocaleLowerCase())
    })
  }

  const createModalCustomer = (selectedCustomer: Customer) => {
    setModalCustomer([selectedCustomer]);
  }

  useEffect(() => {
    if(state.length < 1) requestCustomers()
  }, [state])

  
  const requestCustomers = async () => {
    const response = await getCustomers();
    setState(response);
  }

  const deleteCustomer = async (email: string) => {
    const newCustomersArray = state.filter((state) => {
      return !state.email.includes(email)
    })
    setShowModal(false)
    setShowList(true)
    setState(newCustomersArray)
    await requestDeleteCustomer(email)
  }
  
  const requestDeleteCustomer = async (email: string) => {
    if (!state.some((e) => {
      e.email.includes(email)
    })) {
      apiReqDeleteCustomer(email)
    }
  }

  return(
    <>
      <div className="flex justify-center gap-28">
        <label>
          <input
          type="text"
          placeholder="Search by name" 
          className="rounded-md mb-2 3 p-2"
          onChange={(e) => setSearchBar(e.target.value)}/>
        </label>
        <RegisterFunction />
      </div>

      <div className="bg-white w-2/4 rounded-md mx-auto">
        
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {showList &&
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
                filterCustomers(state).map((customer) => {
                  return (
                    <>
                    <tr key={ customer.email } className="border-b border-solid border-slate-200 rounded-t mb-1">
                        <td className="mx-2 py-2 px-1 ">
                          { customer.customer_name }
                        </td> 
                        <td className="mx-2 py-2 px-1">
                          { customer.email }
                        </td> 
                        <td>
                          <button
                          className="bg-pink-500 rounded-md"
                          onClick={() => {
                            setShowModal(true)
                            setShowList(false)
                            createModalCustomer(customer)
                          }}
                          >
                            <svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FFFFFF" viewBox="0 0 256 256"><rect width="26" height="26" fill="none"></rect><circle cx="116" cy="116" r="84" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                          </button>
                        </td>
                      </tr>
                    </>
                  )
                })
              } 
            </tbody>
          </table>
          }
        </div>
        <>
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex  w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start p-5 border-b border-solid border-slate-200 rounded-t">
                <table>
                  <thead>
                    {
                      modalCustomer.length !== 0 && modalCustomer.map((e) => {
                        return (
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
                      setShowModal(false)
                      setShowList(true)
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="text-white bg-pink-500 w-28 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setShowList(true)
                    }}
                  >
                    Close
                  </button>
                </div>
                          </div>
                        )
                      })
                    } 
                    
                </thead>
                </table>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}</>
      </div>
    </>
  )
}