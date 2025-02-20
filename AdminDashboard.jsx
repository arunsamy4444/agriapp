// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState(null);
//     const [users, setUsers] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [newProduct, setNewProduct] = useState({
//         name: '',
//         quantity: 0,
//         price: 0,
//         description: '',
//         picture: null
//     });

//     const fetchUsers = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:5000/admin/getallusers', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setUsers(response.data.users);
//         } catch (error) {
//             console.error('Error fetching users', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:5000/admin/products', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setProducts(response.data.products);
//         } catch (error) {
//             console.error('Error fetching products', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchOrders = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:5000/admin/getorders', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setOrders(response.data.orders);
//         } catch (error) {
//             console.error('Error fetching orders', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//         if (tab === 'users') fetchUsers();
//         if (tab === 'products') fetchProducts();
//         if (tab === 'orders') fetchOrders();
//     };

//     return (
//         <div>
//             <h2>Admin Dashboard</h2>
//             <div>
//                 <button onClick={() => handleTabClick('users')}>Users List</button>
//                 <button onClick={() => handleTabClick('products')}>Products</button>
//                 <button onClick={() => handleTabClick('orders')}>Orders</button>
//             </div>
//             {activeTab === 'users' && (
//     <div>
//         <h3>Users</h3>
//         {loading ? <p>Loading users...</p> : (
//             <ul>
//                 {users.map(user => (
//                     <li key={user._id}>
//                         <img 
//                             src={`http://localhost:5000${user.profilePic}`} 
//                             alt={user.name} 
//                             style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
//                         />
//                         {user.name} - {user.email}
//                     </li>
//                 ))}
//             </ul>
//         )}
//     </div>
// )}


//             {activeTab === 'products' && (
//                 <div>
//                     <h3>Products</h3>
//                     {loading ? <p>Loading products...</p> : <ul>{products.map(product => (
//                         <li key={product._id}>
//                             <img src={product.picture} alt={product.name} style={{ width: '100px', height: '100px' }} />
//                             {product.name} - {product.quantity}
//                         </li>
//                     ))}</ul>}
//                 </div>
//             )}

//             {activeTab === 'orders' && (
//                 <div>
//                     <h3>Orders</h3>
//                     {loading ? <p>Loading orders...</p> : <ul>{orders.map(order => (
//                         <li key={order._id}>
//                             Order ID: {order._id} - Product: {order.product ? order.product.name : "N/A"} - Status: {order.status}
//                         </li>
//                     ))}</ul>}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;
























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [newProduct, setNewProduct] = useState({
//         name: '',
//         quantity: 0,
//         price: 0,
//         description: '',
//         picture: null
//     });

//     useEffect(() => {
//         // Fetch data for the dashboard when it loads
//         const fetchDashboardData = async () => {
//             setLoading(true);
//             try {
//                 const usersResponse = await axios.get('http://localhost:5000/admin/getallusers', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setUsers(usersResponse.data.users);

//                 const productsResponse = await axios.get('http://localhost:5000/admin/products', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setProducts(productsResponse.data.products);

//                 const ordersResponse = await axios.get('http://localhost:5000/admin/getorders', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setOrders(ordersResponse.data.orders);
//             } catch (error) {
//                 console.error('Error fetching dashboard data', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     const handleEditOrderStatus = async (orderId, status) => {
//         try {
//             const response = await axios.put(`http://localhost:5000/admin/editorders/${orderId}`, { status }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             alert('Order status updated');
            
//             // Update order status directly in the state to avoid extra re-fetch
//             const updatedOrders = orders.map((order) =>
//                 order._id === orderId ? { ...order, status } : order
//             );
//             setOrders(updatedOrders);
//         } catch (error) {
//             console.error('Error updating order status', error);
//         }
//     };

//     const handleEditProduct = async (productId) => {
//         // Replace with actual form/modal for editing product details
//         const name = prompt("Enter new product name:");
//         const quantity = prompt("Enter new product quantity:");

//         if (name && quantity) {
//             try {
//                 await axios.put(`http://localhost:5000/admin/editproducts/${productId}`, { name, quantity }, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 alert('Product updated successfully');
//                 // Re-fetch products to get the updated list
//                 const productsResponse = await axios.get('http://localhost:5000/admin/products', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setProducts(productsResponse.data.products);
//             } catch (error) {
//                 console.error('Error updating product', error);
//             }
//         }
//     };

//     const handleDeleteProduct = async (productId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//         if (confirmDelete) {
//             try {
//                 await axios.delete(`http://localhost:5000/admin/deleteproducts/${productId}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 alert('Product deleted successfully');
//                 // Re-fetch products after deletion
//                 const productsResponse = await axios.get('http://localhost:5000/admin/products', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setProducts(productsResponse.data.products);
//             } catch (error) {
//                 console.error('Error deleting product', error);
//             }
//         }
//     };

//     const handleAddProduct = async () => {
//         const { name, quantity, price, description, picture } = newProduct;
    
//         // Check if all fields are filled
//         if (!name || !quantity || !price || !description || !picture) {
//             alert('Please fill in all fields.');
//             return;
//         }
    
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('quantity', quantity);
//         formData.append('price', price);
//         formData.append('description', description);
//         formData.append('picture', picture); // Send the picture as part of the form data
    
//         try {
//             const response = await axios.post('http://localhost:5000/admin/products/add', formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
    
//             alert('Product added successfully');
//             // Add new product to the products list without re-fetching all products
//             setProducts([...products, response.data.product]);
    
//             // Reset form
//             setNewProduct({
//                 name: '',
//                 quantity: 0,
//                 price: 0,
//                 description: '',
//                 picture: null
//             });
//         } catch (error) {
//             console.error('Error adding product', error);
//         }
//     };
    

//     const handleFileChange = (event) => {
//         setNewProduct({ ...newProduct, picture: event.target.files[0] });
//     };

//     return (
//         <div>
//             <h2>Admin Dashboard</h2>
//             <div>
//                 <button onClick={() => alert('Display Users List')}>Users List</button>
//                 <button onClick={() => alert('Display Products List')}>Products</button>
//                 <button onClick={() => alert('Display Orders List')}>Orders</button>
//             </div>

//             <h3>Add New Product</h3>
//             <input
//                 type="text"
//                 placeholder="Product Name"
//                 value={newProduct.name}
//                 onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             />
//             <input
//                 type="number"
//                 placeholder="Quantity"
//                 value={newProduct.quantity}
//                 onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//             />
//             <input
//                 type="number"
//                 placeholder="Price"
//                 value={newProduct.price}
//                 onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             />
//             <textarea
//                 placeholder="Description"
//                 value={newProduct.description}
//                 onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//             />
//             <input
//                 type="file"
//                 onChange={handleFileChange}
//             />
//             <button onClick={handleAddProduct}>Add Product</button>

//             <h3>Users</h3>
//             {loading ? (
//                 <p>Loading users...</p>
//             ) : (
//                 <ul>
//                     {users.map((user) => (
//                         <li key={user._id}>{user.name} - {user.email}</li>
//                     ))}
//                 </ul>
//             )}

//             <h3>Products</h3>
//             {loading ? (
//                 <p>Loading products...</p>
//             ) : (
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product._id}>
//                               <div>
//                     <img src={product.picture} alt={product.name} style={{ width: '100px', height: '100px' }} />
//                 </div>
//                             {product.name} - {product.quantity}
//                             <button onClick={() => handleEditProduct(product._id)}>Edit</button>
//                             <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}

// <h3>Orders</h3>
// {loading ? (
//     <p>Loading orders...</p>
// ) : (
//     <ul>
//         {orders.map((order) => (
//             <li key={order._id}>
//                 Order ID: {order._id} - 
//                 Product: {order.product ? order.product.name : "N/A"} - 
//                 Status: {order.status}
//                 <select
//                     value={order.status}
//                     onChange={(e) => handleEditOrderStatus(order._id, e.target.value)}
//                 >
//                     <option value="pending">Pending</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                 </select>
//             </li>
//         ))}
//     </ul>
// )}

//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        picture: null
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
                    axios.get('http://localhost:5000/admin/getallusers', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }),
                    axios.get('http://localhost:5000/admin/products', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }),
                    axios.get('http://localhost:5000/admin/getorders', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    })
                ]);
                setUsers(usersResponse.data.users);
                setProducts(productsResponse.data.products);
                setOrders(ordersResponse.data.orders);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleFileChange = (event) => {
        setNewProduct({ ...newProduct, picture: event.target.files[0] });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h2>

            <div className="flex justify-center space-x-4 mb-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">Users</button>
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition">Products</button>
                <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition">Orders</button>
            </div>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h3>
                <input type="text" placeholder="Product Name" className="border p-2 w-full mb-2 rounded-lg" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input type="number" placeholder="Quantity" className="border p-2 w-full mb-2 rounded-lg" onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
                <input type="number" placeholder="Price" className="border p-2 w-full mb-2 rounded-lg" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                <textarea placeholder="Description" className="border p-2 w-full mb-2 rounded-lg" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
                <input type="file" className="border p-2 w-full mb-2 rounded-lg" onChange={handleFileChange} />
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg w-full shadow-md hover:bg-indigo-600 transition">Add Product</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Users</h3>
                    {loading ? <p className="text-gray-500">Loading users...</p> : users.map(user => <p key={user._id} className="border-b py-2">{user.name} - {user.email}</p>)}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Products</h3>
                    {loading ? <p className="text-gray-500">Loading products...</p> : products.map(product => (
                        <div key={product._id} className="border-b pb-2 mb-2 flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img src={product.picture} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                <span className="text-gray-700">{product.name} - {product.quantity}</span>
                            </div>
                            <div>
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition mr-2">Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Orders</h3>
                    {loading ? <p className="text-gray-500">Loading orders...</p> : orders.map(order => (
                        <div key={order._id} className="border-b pb-2 mb-2">
                            <p className="text-gray-700">Order ID: {order._id}</p>
                            <p className="text-gray-700">Product: {order.product ? order.product.name : "N/A"}</p>
                            <p className="text-gray-700">Status: 
                                <select className="border p-1 ml-2 rounded-lg bg-gray-100" value={order.status}>
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
