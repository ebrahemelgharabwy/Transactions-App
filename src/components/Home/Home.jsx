import React, { useContext, useState } from 'react';
import { CounterContext } from '../context/CounterContext';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const { data } = useContext(CounterContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const filteredCustomers = data.customers.filter(customer =>
    searchBy === 'name'
      ? customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      : data.transactions.some(transaction => transaction.customer_id === customer.id && transaction.amount.toString().includes(searchTerm))
  ).map(customer => {
    const customerTransactions = data.transactions.filter(transaction => transaction.customer_id === customer.id);
    return { ...customer, transactions: customerTransactions, transactionCount: customerTransactions.length };
  });

  const handleSearchByChange = (value) => {
    setSearchBy(value);
    setSearchTerm('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'>
      <div className='max-w-5xl mx-auto p-6 pt-10'>
        <form className="flex items-center max-w-2xl mx-auto mt-10 pt-10">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 15.5l5 5m0-8a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              id="simple-search"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={searchBy === 'name' ? 'Search by customer name...' : 'Search by total amount...'}
            />
          </div>
          <div className="ml-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="name"
                checked={searchBy === 'name'}
                onChange={() => handleSearchByChange('name')}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">Search by Name</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="amount"
                checked={searchBy === 'amount'}
                onChange={() => handleSearchByChange('amount')}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">Search by Total Amount</span>
            </label>
          </div>
        </form>

        <h2 className='text-2xl text-blue-950 font-semibold mt-8 mb-4'>Customer Transactions</h2>

        <div className='shadow-lg rounded-lg overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer Id</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer Name</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Number of Transactions</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Transaction Date</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Transaction Amount</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Show Details</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredCustomers.map(customer => (
                <React.Fragment key={customer.id}>
                  <tr className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-800'>{customer.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap cursor-pointer'><i className="fa-solid fa-user pe-2 text-blue-950"></i>{customer.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{customer.transactionCount}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{customer.transactions.map(transaction => (
                      <div key={transaction.id} className="mb-2">{transaction.date}</div>
                    ))}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{customer.transactions.map(transaction => (
                      <div key={transaction.id} className="mb-2"> EGP: {transaction.amount}</div>
                    ))}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <NavLink to={`/customersGraph/${customer.id}`}>
                        <span className='text-blue-500 pe-2 font-medium'>show details</span>
                        <i className="fa-light fas fa-right-long"></i> 
                      </NavLink>
                    </td>
                  </tr>
                  <tr className='md:hidden'>
                    <td colSpan="6" className='px-6 py-4'>
                      <div className='flex flex-col text-gray-800'>
                        <span><strong>Customer Id:</strong> {customer.id}</span>
                        <span><strong>Customer Name:</strong> {customer.name}</span>
                        <span><strong>Number of Transactions:</strong> {customer.transactionCount}</span>
                        {customer.transactions.map(transaction => (
                          <div key={transaction.id} className="mt-2">
                            <span><strong>Transaction Date:</strong> {transaction.date}</span>
                            <span><strong>Transaction Amount:</strong> EGP: {transaction.amount}</span>
                          </div>
                        ))}
                        <NavLink to={`/customersGraph/${customer.id}`} className='text-blue-500 mt-2 font-medium flex items-center'>
                          show details <i className="fa-light fas fa-right-long ml-2"></i>
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

 
