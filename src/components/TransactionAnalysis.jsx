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

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Map transaction type to one-hot encoding
      const typeMapping = {
        'Transfer': { type_TRANSFER: 1, type_PAYMENT: 0, type_CASH_OUT: 0, type_DEBIT: 0, type_CASH_IN: 0 },
        'Payment': { type_TRANSFER: 0, type_PAYMENT: 1, type_CASH_OUT: 0, type_DEBIT: 0, type_CASH_IN: 0 },
        'Cash Out': { type_TRANSFER: 0, type_PAYMENT: 0, type_CASH_OUT: 1, type_DEBIT: 0, type_CASH_IN: 0 },
        'Debit': { type_TRANSFER: 0, type_PAYMENT: 0, type_CASH_OUT: 0, type_DEBIT: 1, type_CASH_IN: 0 },
        'Cash In': { type_TRANSFER: 0, type_PAYMENT: 0, type_CASH_OUT: 0, type_DEBIT: 0, type_CASH_IN: 1 },
      };

      const payload = {
        step: parseFloat(formData.timeStep) || 0,
        amount: parseFloat(formData.transactionAmount) || 0,
        oldbalanceOrg: parseFloat(formData.originBalanceOld) || 0,
        newbalanceOrig: parseFloat(formData.originBalanceNew) || 0,
        oldbalanceDest: parseFloat(formData.destinationBalanceOld) || 0,
        newbalanceDest: parseFloat(formData.destinationBalanceNew) || 0,
        ...typeMapping[formData.transactionType]
      };

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to analyze transaction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the transaction');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
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
                    min={0}
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
                    min={0}
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
                    min={0}
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
                    min={0}
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
                    min={0}
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
                    min={0}
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
                  disabled={loading}
                  className="bg-black dark:bg-white text-white dark:text-black px-12 py-3 rounded-lg font-medium text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Analyze transaction for fraud detection"
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </form>
          </div>

          {/* Result Display */}
          {error && (
            <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className={`mt-6 border rounded-2xl p-6 ${
              result.prediction === 1 
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            }`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  result.prediction === 1 
                    ? 'bg-red-100 dark:bg-red-900/40' 
                    : 'bg-green-100 dark:bg-green-900/40'
                }`}>
                  {result.prediction === 1 ? (
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${
                  result.prediction === 1 
                    ? 'text-red-800 dark:text-red-200' 
                    : 'text-green-800 dark:text-green-200'
                }`}>
                  {result.status}
                </h3>
                
                <div className="mt-4 space-y-2">
                  <p className={`text-sm ${
                    result.prediction === 1 
                      ? 'text-red-700 dark:text-red-300' 
                      : 'text-green-700 dark:text-green-300'
                  }`}>
                    <span className="font-medium">Fraud Probability:</span> {result.fraud_probability}%
                  </p>
                  
                  {result.prediction === 1 ? (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      This transaction shows signs of fraudulent activity.
                    </p>
                  ) : (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      This transaction appears to be legitimate based on the analysis.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TransactionAnalysis;

