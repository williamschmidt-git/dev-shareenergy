import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CustomerProvider } from './context/provider/customer'
import { UserProvider } from './context/provider/user'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <UserProvider>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </UserProvider>
  </BrowserRouter>
)
