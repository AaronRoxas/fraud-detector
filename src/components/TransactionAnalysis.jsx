import React, { useState } from 'react';

const TransactionAnalysis = () => {
  const [formData, setFormData] = useState({
    transactionType: 'Transfer',
    timeStep: '',
    transactionAmount: '',
    originBalanceOld: '',
    originBalanceNew: '',
    destinationBalanceOld: '',
    destinationBalanceNew: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Analyzing transaction:', formData);
    // Here you would typically send the data to an API
    alert('Transaction analysis submitted! (This is a demo)');
  };

  return (
    <section className="py-16 md:py-24 bg-transparent" id='transaction-analysis'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 dark:text-white text-gray-900">
            Transaction Analysis
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter transaction details to check for potential fraud activities
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Transaction Type Dropdown */}
              <div className="mb-6">
                <label 
                  htmlFor="transactionType" 
                  className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                >
                  Transaction Type
                </label>
                <select
                  id="transactionType"
                  name="transactionType"
                  value={formData.transactionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                  aria-label="Select transaction type"
                >
                  <option value="Transfer">Transfer</option>
                  <option value="Payment">Payment</option>
                  <option value="Cash Out">Cash Out</option>
                  <option value="Debit">Debit</option>
                  <option value="Cash In">Cash In</option>
                </select>
              </div>

              {/* Time Step & Transaction Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label 
                    htmlFor="timeStep" 
                    className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                  >
                    Time Step
                  </label>
                  <input
                    type="number"
                    id="timeStep"
                    name="timeStep"
                    value={formData.timeStep}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                    aria-label="Enter time step"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="transactionAmount" 
                    className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                  >
                    Transaction Amount
                  </label>
                  <input
                    type="number"
                    id="transactionAmount"
                    name="transactionAmount"
                    value={formData.transactionAmount}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                    aria-label="Enter transaction amount"
                  />
                </div>
              </div>

              {/* Origin Balance OLD & NEW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label 
                    htmlFor="originBalanceOld" 
                    className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                  >
                    Origin Balance (OLD)
                  </label>
                  <input
                    type="number"
                    id="originBalanceOld"
                    name="originBalanceOld"
                    value={formData.originBalanceOld}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                    aria-label="Enter origin balance old"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="originBalanceNew" 
                    className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                  >
                    Origin Balance (NEW)
                  </label>
                  <input
                    type="number"
                    id="originBalanceNew"
                    name="originBalanceNew"
                    value={formData.originBalanceNew}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                    aria-label="Enter origin balance new"
                  />
                </div>
              </div>

              {/* Destination Balance OLD & NEW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label 
                    htmlFor="destinationBalanceOld" 
                    className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                  >
                    Destination Balance (OLD)
                  </label>
                  <input
                    type="number"
                    id="destinationBalanceOld"
                    name="destinationBalanceOld"
                    value={formData.destinationBalanceOld}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                    aria-label="Enter destination balance old"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="destinationBalanceNew" 
                    className="block text-sm font-medium mb-2 dark:text-white text-gray-900"
                  >
                    Destination Balance (NEW)
                  </label>
                  <input
                    type="number"
                    id="destinationBalanceNew"
                    name="destinationBalanceNew"
                    value={formData.destinationBalanceNew}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
                    aria-label="Enter destination balance new"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-black dark:bg-white text-white dark:text-black px-12 py-3 rounded-lg font-medium text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white"
                  aria-label="Analyze transaction for fraud detection"
                >
                  Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionAnalysis;

