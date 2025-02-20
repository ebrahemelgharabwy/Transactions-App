import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CounterContext } from '../context/CounterContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function CustomerGraph () {
  const { id } = useParams();
  const { data } = useContext(CounterContext);
  const customer = data.customers.find((c) => c.id === parseInt(id));
  const customerTransactions = data.transactions.filter(transaction => transaction.customer_id === customer.id);

  if (!customer) {
    return <div className='t-20 mt-20'>No customer found</div>;
  }

  const transactionData = customerTransactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.amount
  }));

  const getQuarter = (date) => {
    const month = new Date(date).getMonth() + 1;
    if (month <= 3) return 'Q1';
    if (month <= 6) return 'Q2';
    if (month <= 9) return 'Q3';
    return 'Q4';
  };

  // Group transactions by quarter
  const groupedData = ['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => {
    const transactionsInQuarter = transactionData.filter(t => getQuarter(t.date) === quarter);
    return {
      quarter,
      totalAmount: transactionsInQuarter.reduce((sum, t) => sum + t.amount, 0),
      transactions: transactionsInQuarter
    };
  });

  // Prepare data for each bar separately
  const chartData = groupedData.reduce((acc, curr) => {
    curr.transactions.forEach(t => {
      acc.push({
        quarter: curr.quarter,
        date: t.date,
        amount: t.amount
      });
    });
    return acc;
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'>
      <div className='max-w-7xl flex flex-col items-center mt-10 pt-10'>
        <h1 className='text-4xl text-blue-950 font-serif'>{customer.name}</h1>
        <h2 className='text-xl text-blue-950 font-serif'>Transaction Amounts</h2>
        <ul className='mb-10'>
          <li className=' text-blue-950 font-serif'>
            Total Amount: {customerTransactions.reduce((total, transaction) => total + transaction.amount, 0)}
          </li>
          <li className='text-xl text-blue-950 font-serif'>
          <h1><span>customer Id : </span>{customer.id}</h1>

          </li>
        </ul>
      </div>
      <div className='flex justify-center items-center'>
        <BarChart width={800} height={400} data={chartData} className='bg-white p-6 rounded-lg shadow-lg'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickCount={10} domain={[0, 3000]} />
          <Tooltip />
          <Legend verticalAlign="top" height={66} />
          <Bar dataKey="amount" fill="#ab47bc" name="Transaction Amount" />
        </BarChart>
      </div>
    </div>
  );
};

