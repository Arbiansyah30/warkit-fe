import { useTransactionById } from '@hooks/home/useTransactionCreation';
import { TransactionModel } from '@model/transaction';
import React, { useEffect, useState } from 'react';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const defaultTransaction: TransactionModel = {
  id: '',
  name: '',
  email: '',
  paymentMethod: 'CASH',
  details: [],
  status: '',
  totalQuantity: 0,
  totalAmount: 0,
  transactionDetails: []
};

const OrderDetail: React.FC = () => {
  const { data: transactionById, isLoading } = useTransactionById();
  const [transaction, setTransaction] = useState<TransactionModel>(defaultTransaction);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (transactionById && transactionById?.data) {
      setTransaction(transactionById.data);
    }
  }, [transactionById]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="text-white mb-4 flex items-center gap-2"
      >
        <FaArrowLeftLong /> Back
      </button>

      <div className="bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Transaction Detail</h2>

        <div className="mb-6">
          <p><strong>Name:</strong> {transaction.name}</p>
          <p><strong>Email:</strong> {transaction.email}</p>
          <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
          <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${transaction.status === 'PAID' ? 'bg-green-500' : 'bg-gray-500'}`}>{transaction.status}</span></p>
          <p><strong>Total Quantity:</strong> {transaction.totalQuantity}</p>
          <p><strong>Total Amount:</strong> {transaction.totalAmount}</p>
        </div>

        <h3 className="text-xl font-semibold mb-4">Products</h3>
        <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 max-sm:gap-3 gap-5 items-center justify-center">
          
          {transaction.transactionDetails?.map((detail, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md">
              <img 
                src={detail.product?.image} 
                alt={detail.product?.name} 
                className="w-full max-h-[180px] object-cover rounded-md mb-4"
              />
              <p><strong>Product Name:</strong> {detail.product?.name}</p>
              <p><strong>Category:</strong> {detail.product?.category?.name}</p>
              <p><strong>Quantity:</strong> {detail.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;