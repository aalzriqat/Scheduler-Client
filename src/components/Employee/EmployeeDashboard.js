import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import SwapRequestForm from './SwapRequestForm';
import SentReceivedSwaps from './SentReceivedSwaps';
import ManageSwaps from './ManageSwaps';

const EmployeeDashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='main-content'>
        <h1 align="center" className="main form-title">Employee Dashboard</h1>
        <Routes>
          <Route path="swap-request-form" element={<SwapRequestForm />} />
          <Route path="employee-swap-requests" element={<SentReceivedSwaps />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeDashboard;