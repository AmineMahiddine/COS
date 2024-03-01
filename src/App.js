// App.js
import React, { useState, useEffect } from 'react';
import InvoiceList from './components/InvoiceList';

const App = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://elhoussam.github.io/invoicesapi/db.json');
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Invoice Management System</h1>
      <InvoiceList invoices={invoices} />
    </div>
  );
};

export default App;

