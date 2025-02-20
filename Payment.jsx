// import React, { useState } from 'react';  
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const Payment = () => {
//     const navigate = useNavigate();
//     const { userId, orderId } = useParams(); // Extract userId and orderId from URL
    
//     const [paymentMethod, setPaymentMethod] = useState('credit_card');
//     const [transactionId] = useState('txn_1234567890'); // Example transaction ID
//     const [amount, setAmount] = useState(''); // Allow user to fill in the amount

//     // Fetch the user's token
//     const token = localStorage.getItem('token');

//     if (!token) {
//         alert('You must be logged in to make a payment.');
//         navigate('/login'); // Redirect to login if no token is found
//         return null;
//     }

//     const handlePayment = () => {
//         if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
//             alert('Please enter a valid amount.');
//             return;
//         }

//         const paymentDetails = {
//             amount: parseFloat(amount), // Convert to number
//             paymentMethod,
//             transactionId
//         };

//         axios.post(`http://localhost:5000/payment/pay/${userId}/${orderId}`, paymentDetails, {
//             headers: {
//                 Authorization: `Bearer ${token}` // Include token in Authorization header for payment
//             }
//         })
//         .then(response => {
//             alert('Payment processed successfully!');
//             navigate(`/order-confirmation/${orderId}`);
//         })
//         .catch(error => {
//             console.error('Error processing payment:', error);
//             alert('Payment failed. Please try again.');
//         });
//     };

//     return (
//         <div>
//             <h1>Payment Page</h1>
//             <h2>Order ID: {orderId}</h2>

//             {/* Amount input */}
//             <div>
//                 <h3>Enter Payment Amount</h3>
//                 <input
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     placeholder="Enter amount"
//                     min="0.01" // Minimum value
//                     step="0.01" // Decimal step
//                     required
//                 />
//             </div>

//             <p>Total Price: ${amount}</p>

//             {/* Payment Method Selection */}
//             <div>
//                 <h3>Select Payment Method</h3>
//                 <label>
//                     <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="credit_card"
//                         checked={paymentMethod === 'credit_card'}
//                         onChange={() => setPaymentMethod('credit_card')}
//                     />
//                     Credit Card
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="paypal"
//                         checked={paymentMethod === 'paypal'}
//                         onChange={() => setPaymentMethod('paypal')}
//                     />
//                     PayPal
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="bank_transfer"
//                         checked={paymentMethod === 'bank_transfer'}
//                         onChange={() => setPaymentMethod('bank_transfer')}
//                     />
//                     Bank Transfer
//                 </label>
//             </div>

//             <button onClick={handlePayment}>Complete Payment</button>
//         </div>
//     );
// };

// export default Payment;








import React, { useState } from 'react';  
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const { userId, orderId } = useParams(); 
    
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [transactionId] = useState('txn_1234567890'); 
    const [amount, setAmount] = useState(''); 

    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to make a payment.');
        navigate('/login'); 
        return null;
    }

    const handlePayment = () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        const paymentDetails = {
            amount: parseFloat(amount), 
            paymentMethod,
            transactionId
        };

        axios.post(`http://localhost:5000/payment/pay/${userId}/${orderId}`, paymentDetails, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            alert('Payment processed successfully!');
            navigate(`/order-confirmation/${orderId}`);
        })
        .catch(error => {
            console.error('Error processing payment:', error);
            alert('Payment failed. Please try again.');
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">Payment Page</h1>
            <h2 className="text-lg text-gray-700 text-center">Order ID: {orderId}</h2>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Enter Payment Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                />
            </div>

            <p className="mt-2 text-lg font-semibold text-center">Total Price: ${amount}</p>

            <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Select Payment Method</h3>
                <div className="flex flex-col space-y-2 mt-2">
                    {['credit_card', 'paypal', 'bank_transfer'].map((method) => (
                        <label key={method} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method}
                                checked={paymentMethod === method}
                                onChange={() => setPaymentMethod(method)}
                                className="form-radio h-5 w-5 text-indigo-600"
                            />
                            <span className="text-gray-700 capitalize">{method.replace('_', ' ')}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button 
                onClick={handlePayment} 
                className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300">
                Complete Payment
            </button>
        </div>
    );
};

export default Payment;





// import React, { useState } from 'react'; 
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const Payment = () => {
//     const navigate = useNavigate();
//     const { userId, orderId } = useParams(); // Extract userId and orderId from URL
//     const [paymentMethod, setPaymentMethod] = useState('credit_card');
//     const [transactionId, setTransactionId] = useState('txn_1234567890'); // Example transaction ID
//     const [amount, setAmount] = useState(1000000000000000.00); // Set amount directly

//     // Fetch the user's token
//     const token = localStorage.getItem('token');

//     if (!token) {
//         alert('You must be logged in to make a payment.');
//         navigate('/login'); // Redirect to login if no token is found
//         return null;
//     }

//     const handlePayment = () => {
//         const paymentDetails = {
//             amount,
//             paymentMethod,
//             transactionId
//         };

//         axios.post(`http://localhost:5000/payment/pay/${userId}/${orderId}`, paymentDetails, {
//             headers: {
//                 Authorization: `Bearer ${token}` // Include token in Authorization header for payment
//             }
//         })
//         .then(response => {
//             alert('Payment processed successfully!');
//             navigate(`/order-confirmation/${orderId}`);
//         })
//         .catch(error => {
//             console.error('Error processing payment:', error);
//             alert('Payment failed. Please try again.');
//         });
//     };

//     return (
//         <div>
//             <h1>Payment Page</h1>
//             <h2>Order ID: {orderId}</h2>
//             <p>Total Price: ${amount}</p>

//             {/* Payment Form */}
//             <div>
//                 <h3>Select Payment Method</h3>
//                 <label>
//                     <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="credit_card"
//                         checked={paymentMethod === 'credit_card'}
//                         onChange={() => setPaymentMethod('credit_card')}
//                     />
//                     Credit Card
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="paypal"
//                         checked={paymentMethod === 'paypal'}
//                         onChange={() => setPaymentMethod('paypal')}
//                     />
//                     PayPal
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="bank_transfer"
//                         checked={paymentMethod === 'bank_transfer'}
//                         onChange={() => setPaymentMethod('bank_transfer')}
//                     />
//                     Bank Transfer
//                 </label>
//             {/* </div> */}

//             {/* Transaction ID - Mock */}
//             {paymentMethod === 'credit_card' && (
//                 <div>
//                     <h3>Enter Credit Card Details</h3>
//                     <input
//                         type="text"
//                         placeholder="Card Number"
//                         maxLength="16"
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="MM/YY Expiry Date"
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="CVV"
//                         maxLength="3"
//                         required
//                     />
//                 </div>
//             )}

//             <button onClick={handlePayment}>Complete Payment</button>
//         </div>
//     );
// };

// export default Payment;
