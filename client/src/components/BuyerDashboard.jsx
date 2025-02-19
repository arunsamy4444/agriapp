import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.id;
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    } else {
        navigate('/login');
    }

    useEffect(() => {
        if (!userId) return;

        axios.get('http://localhost:5000/buyer/getallproducts')
            .then(response => {
                console.log('Fetched Products:', response.data.products);
                setProducts(response.data.products);
            })
            .catch(error => console.error('Error fetching products:', error));

        axios.get(`http://localhost:5000/buyer/getorder/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setOrders(response.data.orders))
        .catch(error => console.error('Error fetching orders:', error));

        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const getImageUrl = (picture) => {
        if (!picture) return 'default-image-path.jpg';
        return picture.startsWith('http') ? picture : `http://localhost:5000/uploads/${picture}`;
    };

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            alert('Product already in cart');
            return;
        }
        setCart(prevCart => [...prevCart, { ...product, quantity }]);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };
    
    const placeOrder = () => {
        if (!selectedProduct || !quantity) {
            alert('Please select a product and quantity.');
            return;
        }

        axios.post('http://localhost:5000/buyer/placeorder', {
            product: selectedProduct._id,
            quantity
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            alert('Order placed successfully');
            setOrders([...orders, response.data.order]);
            setCart([]);
            localStorage.removeItem('cart');
            setOrderId(response.data.order._id);
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        });
    };

    const goToPayment = () => {
        if (!orderId || !userId) {
            alert('No order found for payment');
            return;
        }
        navigate(`/payment/${userId}/${orderId}`);
    };
    
    return (
        <div>
            <h1>Buyer Dashboard</h1>
            <h2>Products</h2>
            <div className="products">
                {products.map(product => (
                    <div key={product._id}>
                        <img src={getImageUrl(product.picture)} alt={product.name} onError={(e) => e.target.src = 'default-image-path.jpg'} />
                        <h3>{product.name}</h3>
                        <p>Quantity: {product.quantity}</p>
                        <button onClick={() => {
                            setSelectedProduct(product);
                            setQuantity(1);
                        }}>Select Product</button>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <h2>Your Cart</h2>
            <div className="cart">
                {cart.map(item => (
                    <div key={item._id}>
                        <h4>{item.name} - {item.quantity}</h4>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={placeOrder}>Place Order</button>

            {selectedProduct && (
                <div>
                    <h3>Order Form</h3>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
                    <button onClick={placeOrder}>Place Order</button>
                </div>
            )}

            {orderId && (
                <div>
                    <h2>Your Order ID: {orderId}</h2>
                    <button onClick={goToPayment}>Proceed to Payment</button>
                </div>
            )}
        </div>
    );
};

export default BuyerDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const BuyerDashboard = () => {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [address, setAddress] = useState({
//         taluk: '',
//         district: '',
//         pincode: '',
//         villageTown: ''
//     });
//     const [orderId, setOrderId] = useState(null); // Store the orderId for payment
//     const navigate = useNavigate();

//     const token = localStorage.getItem('token');
//     let userId = null;
//     if (token) {
//         try {
//             const decodedToken = jwtDecode(token);
//             userId = decodedToken.id;
//         } catch (error) {
//             console.error('Invalid token:', error);
//             localStorage.removeItem('token');
//             navigate('/login');
//         }
//     } else {
//         navigate('/login');
//     }

//     useEffect(() => {
//         if (!userId) return;

//         axios.get('http://localhost:5000/buyer/getallproducts')
//             .then(response => setProducts(response.data.products))
//             .catch(error => console.error('Error fetching products:', error));

//         axios.get(`http://localhost:5000/buyer/getorder/${userId}`, {
//             headers: { 
//                 Authorization: `Bearer ${token}` 
//             }
//         })
//         .then(response => setOrders(response.data.orders))
//         .catch(error => console.error('Error fetching orders:', error));

//         const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//         setCart(savedCart);
//     }, [userId]);

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

//     const addToCart = (product) => {
//         const existingProduct = cart.find(item => item._id === product._id);
//         if (existingProduct) {
//             alert('Product already in cart');
//             return;
//         }
//         setCart(prevCart => [...prevCart, { ...product, quantity }]);
//     };

//     const removeFromCart = (productId) => {
//         setCart(prevCart => prevCart.filter(item => item._id !== productId));
//     };
    
//     const placeOrder = () => {
//         if (!selectedProduct || !quantity || !address.taluk || !address.district || !address.pincode || !address.villageTown) {
//             alert('Please fill all the details for the order.');
//             return;
//         }

//         const token = localStorage.getItem('token');

//         axios.post('http://localhost:5000/buyer/placeorder', {
//             product: selectedProduct._id,
//             quantity,
//             address
//         }, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(response => {
//             alert('Order placed successfully');
//             setOrders([...orders, response.data.order]);
//             setCart([]);
//             localStorage.removeItem('cart');
//             setOrderId(response.data.order._id); // Set orderId for payment
//         })
//         .catch(error => {
//             console.error('Error placing order:', error);
//             alert('Failed to place order. Please try again.');
//         });
//     };

//     const goToPayment = () => {
//         if (!orderId || !userId) {
//             alert('No order found for payment');
//             return;
//         }
//         // Navigate to the payment page, passing orderId and userId via state
//         navigate(`/payment/${userId}/${orderId}`);
//     };
    

//     return (
//         <div>
//             <h1>Buyer Dashboard</h1>
//             <h2>Products</h2>
//             <div className="products">
//                 {products.map(product => (
//                     <div key={product._id}>
//                         <img src={product.picture} alt={product.name} />
//                         <h3>{product.name}</h3>
//                         <p>{product.description || 'No description available'}</p>
//                         <p>Quantity: {product.quantity}</p>
//                         <button onClick={() => {
//                             setSelectedProduct(product);
//                             setQuantity(1);
//                         }}>Select Product</button>
//                         <button onClick={() => addToCart(product)}>Add to Cart</button>
//                     </div>
//                 ))}
//             </div>

//             <h2>Your Cart</h2>
//             <div className="cart">
//                 {cart.map(item => (
//                     <div key={item._id}>
//                         <h4>{item.name} - {item.quantity}</h4>
//                         <button onClick={() => removeFromCart(item._id)}>Remove</button>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={placeOrder}>Place Order</button>

//             {selectedProduct && (
//                 <div>
//                     <h3>Order Form</h3>
//                     <input
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(Number(e.target.value))}
//                         min="1"
//                     />
//                     <h4>Enter Delivery Address</h4>
//                     <input
//                         type="text"
//                         placeholder="Taluk"
//                         value={address.taluk}
//                         onChange={(e) => setAddress({ ...address, taluk: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="District"
//                         value={address.district}
//                         onChange={(e) => setAddress({ ...address, district: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Pincode"
//                         value={address.pincode}
//                         onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Village/Town"
//                         value={address.villageTown}
//                         onChange={(e) => setAddress({ ...address, villageTown: e.target.value })}
//                     />
//                     <button onClick={placeOrder}>Place Order</button>
//                 </div>
//             )}

//             {orderId && (
//                 <div>
//                     <h2>Your Order ID: {orderId}</h2>
//                     <button onClick={goToPayment}>Proceed to Payment</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BuyerDashboard;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Corrected import
// import { useNavigate } from 'react-router-dom'; // For redirecting if not authenticated

// const BuyerDashboard = () => {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [address, setAddress] = useState({
//         taluk: '',
//         district: '',
//         pincode: '',
//         villageTown: ''
//     });
//     const navigate = useNavigate();

//     // Retrieve the token from localStorage and decode it
//     const token = localStorage.getItem('token');
//     let userId = null;
//     if (token) {
//         try {
//             const decodedToken = jwtDecode(token);
//             userId = decodedToken.id; // Assuming 'id' is the field in the token payload
//         } catch (error) {
//             console.error('Invalid token:', error);
//             localStorage.removeItem('token');
//             navigate('/login'); // Redirect to login if token is invalid
//         }
//     } else {
//         navigate('/login'); // Redirect to login if no token is found
//     }

//     useEffect(() => {
//         if (!userId) return;
         
//         // Fetch all available products
//         axios.get('http://localhost:5000/buyer/getallproducts')
//             .then(response => setProducts(response.data.products))
//             .catch(error => console.error('Error fetching products:', error));


//             const token = localStorage.getItem('token'); 


//             if (!token) {
//                 console.error('No token found in localStorage');
//                 return;
//             }
// // Fetch orders placed by the user
// axios.get(`http://localhost:5000/buyer/getorder/${userId}`, {
//     headers: { 
//         Authorization: `Bearer ${token}` 
//     }
// })
// .then(response => setOrders(response.data.orders))
// .catch(error => console.error('Error fetching orders:', error));

//         // Load cart from localStorage if it exists
//         const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//         setCart(savedCart);
//     }, [userId, navigate]);

//     useEffect(() => {
//         // Persist cart to localStorage whenever it changes
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

//     const addToCart = (product) => {
//         const existingProduct = cart.find(item => item._id === product._id);
//         if (existingProduct) {
//             alert('Product already in cart');
//             return;
//         }
//         setCart(prevCart => [...prevCart, { ...product, quantity }]);
//     };

//     const removeFromCart = (productId) => {
//         setCart(prevCart => prevCart.filter(item => item._id !== productId));
//     };

//     const placeOrder = () => {
//         if (!selectedProduct || !quantity || !address.taluk || !address.district || !address.pincode || !address.villageTown) {
//             alert('Please fill all the details for the order.');
//             return;
//         }
    
//         const token = localStorage.getItem('token'); // Get the token from localStorage
    
//         axios.post('http://localhost:5000/buyer/placeorder', {
//             product: selectedProduct._id,
//             quantity,
//             address
//         }, {
//             headers: {
//                 Authorization: `Bearer ${token}`  // Include the token in the Authorization header
//             }
//         })
//         .then(response => {
//             alert('Order placed successfully');
//             setOrders([...orders, response.data.order]);
//             setCart([]); // Clear the cart after successful order
//             localStorage.removeItem('cart'); // Remove from localStorage
    
//             // Redirect to the payment page with the orderId passed as a parameter
//             navigate(`/payment/${response.data.order._id}`);
//         })
//         .catch(error => {
//             console.error('Error placing order:', error);
//             alert('Failed to place order. Please try again.');
//         });
//     };
    
    
    

//     const handleEditOrder = (orderId) => {
//         const updatedOrder = {
//             quantity,
//             address,
//             status: 'shipped' // Or 'delivered', depending on the use case
//         };

//         axios.put(`http://localhost:5000/buyer/editorder/${orderId}`, updatedOrder)
//             .then(response => {
//                 const updatedOrders = orders.map(order =>
//                     order._id === orderId ? response.data.order : order
//                 );
//                 setOrders(updatedOrders);
//             })
//             .catch(error => console.error('Error updating order:', error));
//     };

//     const deleteOrder = (orderId) => {
//         axios.delete(`http://localhost:5000/buyer/deleteorder/${orderId}`)
//             .then(response => {
//                 const filteredOrders = orders.filter(order => order._id !== orderId);
//                 setOrders(filteredOrders);
//             })
//             .catch(error => console.error('Error deleting order:', error));
//     };

//     return (
//         <div>
//             <h1>Buyer Dashboard</h1>

//             <h2>Products</h2>
//             <div className="products">
//                 {products.map(product => (
//                     <div key={product._id}>
//                         <img src={product.picture} alt={product.name} />
//                         <h3>{product.name}</h3>
//                         <p>{product.description || 'No description available'}</p>
//                         <p>Quantity: {product.quantity}</p>
//                         <button onClick={() => {
//                             setSelectedProduct(product);
//                             setQuantity(1); // Reset quantity when selecting a new product
//                         }}>Select Product</button>
//                         <button onClick={() => addToCart(product)}>Add to Cart</button>
//                     </div>
//                 ))}
//             </div>

//             <h2>Your Cart</h2>
//             <div className="cart">
//                 {cart.map(item => (
//                     <div key={item._id}>
//                         <h4>{item.name} - {item.quantity}</h4>
//                         <button onClick={() => removeFromCart(item._id)}>Remove</button>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={placeOrder}>Place Order</button>
//             <button onClick={() => navigate(`/payment/${userId}`)}>Proceed to Payment</button>


//             {selectedProduct && (
//                 <div>
//                     <h3>Order Form</h3>
//                     <input
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(Number(e.target.value))}
//                         min="1"
//                     />
//                     <h4>Enter Delivery Address</h4>
//                     <input
//                         type="text"
//                         placeholder="Taluk"
//                         value={address.taluk}
//                         onChange={(e) => setAddress({ ...address, taluk: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="District"
//                         value={address.district}
//                         onChange={(e) => setAddress({ ...address, district: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Pincode"
//                         value={address.pincode}
//                         onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Village/Town"
//                         value={address.villageTown}
//                         onChange={(e) => setAddress({ ...address, villageTown: e.target.value })}
//                     />
//                     <button onClick={placeOrder}>Place Order</button>
//                 </div>
//             )}

//             <h2>Your Orders</h2>
//             <div className="orders">
//                 {orders.map(order => (
//                     <div key={order._id}>
//                         <h3>Order ID: {order._id}</h3>
//                         <p>Product: {order.product.name}</p>
//                         <p>Quantity: {order.quantity}</p>
//                         <p>Status: {order.status}</p>
//                         <button onClick={() => handleEditOrder(order._id)}>Edit Order</button>
//                         <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BuyerDashboard;