import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5; 

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/product', {
              params: {
                featured: false, // Change this based on user preference
                name: searchQuery, // Use searchQuery state
                category: categoryFilter, // Use categoryFilter state
                sort: 'price', // Change this based on user preference
                fields: 'name,price,image', // Change this based on user preference
                limit: productsPerPage,
                page: currentPage,
              },
            });
      
            setProducts(response.data.products);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
          }
        };
      
        fetchProducts();
      }, [searchQuery, categoryFilter, currentPage]);
      

  return (
    <div>
       <div>
  <input
    type="text"
    placeholder="Search by name..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
  >
   
    <option value="true">true</option>
    <option value="false">false</option>
    {/* Add more category options as needed */}
  </select>
</div>
<div>
  {/* Pagination controls */}
  <button
    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <button
    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
    disabled={products.length < productsPerPage}
  >
    Next
  </button>
</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
             
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
