import { useEffect, useState } from "react";
import { Customer, getCustomers } from "../http/requests/Customers";

export default function AllCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() =>{
    if(customers.length < 1) requestCustomers()
  }, [])

  
  const requestCustomers = async () => {
    const response = await getCustomers();
    setCustomers(response);
  }

  console.log(customers)

  return(
    <>
      <div className="bg-white w-1/2 mx-1 rounded-md">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {customers.length > 0 
          && 
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>CPF</th>
              </tr>
            </thead>
            
            <tbody>
              {
                customers.map((customer) => {
                  return (
                    <tr key={customer.email}>
                      <td >
                        { customer.email }
                      </td> 
                    </tr>
                  )
                })
              } 
            </tbody>
          </table>
          }
        </div>

      </div>
    </>
  )
}