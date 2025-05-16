import React, { useState, useMemo, useEffect } from 'react';
import SearchBar from './searchbar';
import FilterDropdown from './filter';
import ResourceCard from './rescard';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';

const ResourceGallery = () => {
  const [selectedFilter, setSelectedFilter] = useState({ id: 1, name: 'All Resources' });
  const [searchText, setSearchText] = useState('');
  const [resources, setResources] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/resources');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const addToCart = (item) => {
    // Check if the item is already in cart to avoid duplicates
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id === item.id && cartItem.variant.name === item.variant.name
    );
    
    if (existingItemIndex === -1) {
      // Item is not in cart, add it
      setCart([...cart, item]);
    } else {
      // Item is already in cart, could update quantity here if needed
      console.log('Item already in cart');
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const addToWishlist = (item) => {
    // Check if item already exists in wishlist to avoid duplicates
    const existingIndex = wishlist.findIndex(wishlistItem => wishlistItem.id === item.id);
    
    if (existingIndex === -1) {
      // Item not in wishlist, add it
      setWishlist([...wishlist, item]);
    } else {
      // Item exists, update it (e.g., if variant changed)
      const updatedWishlist = [...wishlist];
      updatedWishlist[existingIndex] = item;
      setWishlist(updatedWishlist);
    }
  };

  const removeFromWishlist = (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist.splice(index, 1);
    setWishlist(updatedWishlist);
  };

  const isInWishlist = (itemId) => {
    return wishlist.some(item => item.id === itemId);
  };

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const searchRegex = new RegExp(searchText.toLowerCase());
      if (selectedFilter.id === 1) {
        return searchRegex.test(resource.title.toLowerCase());
      } else {
        return (
          searchRegex.test(resource.title.toLowerCase()) &&
          resource.type === selectedFilter.name.toLowerCase()
        );
      }
    });
  }, [selectedFilter, searchText, resources]);
  
  const topPicks = useMemo(() => 
    filteredResources.filter(resource => resource.section === 'top picks'), 
    [filteredResources]
  );

  const bestSellers = useMemo(() => 
    filteredResources.filter(resource => resource.section === 'bestsellers'), 
    [filteredResources]
  );

  const healthcare = useMemo(() => 
    filteredResources.filter(resource => resource.section === 'healthcare'), 
    [filteredResources]
  );

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.variant.price, 0).toFixed(2);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      // Simulate API call to payment processor
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Order placed successfully!');
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
      alert('Checkout failed. Please try again.');
    }
  };

  // Get accent color for checkout button
  const getAccentColor = () => {
    return 'bg-blue-600 hover:bg-blue-700';
  };

  // Fixed function to add all items from wishlist to cart
  const handleAddAllToCart = () => {
    // Create a copy of the current cart
    let updatedCart = [...cart];
    let addedCount = 0;
    
    // Process each wishlist item
    wishlist.forEach(wishlistItem => {
      // Skip items without variants
      if (!wishlistItem.variant) {
        return;
      }
      
      // Check if this specific item+variant combo is already in the cart
      const existingItemIndex = updatedCart.findIndex(cartItem => 
        cartItem.id === wishlistItem.id && cartItem.variant.name === wishlistItem.variant.name
      );
      
      // Only add if not already in cart
      if (existingItemIndex === -1) {
        updatedCart.push(wishlistItem);
        addedCount++;
      }
    });
    
    // Only update the cart state if we actually added something
    if (addedCount > 0) {
      setCart(updatedCart);
      setIsWishlistOpen(false);
      setIsCartOpen(true);
    } else if (wishlist.length > 0) {
      alert('All wishlist items are already in your cart');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
        
        <div className="flex items-center gap-2">
          {/* Wishlist Icon with Counter */}
          <button 
            className="relative p-2 bg-pink-500 hover:bg-pink-700 text-white rounded-full transition-colors"
            onClick={() => setIsWishlistOpen(true)}
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>
          
          {/* Shopping Cart Icon with Counter */}
          <button 
            className="relative p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-3xl">
            Discover community-made libraries,
            <span className="text-blue-500"> plugins</span>,
            icon sets, and more
          </h1>
        </div>
        
        <div className="flex justify-center gap-5 mb-12">
          <SearchBar 
            onSearch={handleSearch}
            resources={resources} // Pass resources to SearchBar
          />
          <FilterDropdown 
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        <Header />
      </div>
      
      {/* Top Picks Section */}
      {topPicks.length > 0 && (
        <div className="mb-20">
          <h2 className="text-3xl font-medium mb-8">Top Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPicks.slice(0, 8).map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource} 
                addToCart={addToCart} 
                addToWishlist={addToWishlist}
                isInWishlist={isInWishlist(resource.id)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Bestsellers Section */}
      {bestSellers.length > 0 && (
        <div className="mb-20">
          <h2 className="text-3xl font-medium mb-8">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 8).map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource} 
                addToCart={addToCart} 
                addToWishlist={addToWishlist}
                isInWishlist={isInWishlist(resource.id)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Healthcare Section */}
      {healthcare.length > 0 && (
        <div className="mb-20">
          <h2 className="text-3xl font-medium mb-8">Healthcare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthcare.slice(0, 8).map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource} 
                addToCart={addToCart} 
                addToWishlist={addToWishlist}
                isInWishlist={isInWishlist(resource.id)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredResources.length === 0 && (
        <div className="text-center text-gray-500 text-2xl py-12">
          No resources found matching your search or filter
        </div>
      )}

      {/* Shopping Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            {cart.length > 0 ? (
              <div className="mb-6 max-h-80 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between py-2 items-center border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                        {/* Using placeholder image since actual image logic depends on your implementation */}
                        <div className="w-full h-full bg-blue-200"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.variant.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">${item.variant.price}</span>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}

            {/* Total */}
            {cart.length > 0 && (
              <>
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className={`w-full py-4 ${getAccentColor()} text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors`}
                >
                  Complete Purchase
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Wishlist Items */}
            {wishlist.length > 0 ? (
              <div className="mb-6 max-h-80 overflow-y-auto">
                {wishlist.map((item, index) => (
                  <div key={index} className="flex justify-between py-3 items-center border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100">
                        {/* Using placeholder image since actual image logic depends on your implementation */}
                        <div className="w-full h-full bg-pink-100"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                        {item.variant && (
                          <p className="text-xs text-gray-400">{item.variant.name} - ${item.variant.price}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // If the item has a selected variant, add it to cart
                          if (item.variant) {
                            addToCart(item);
                            // Provide feedback
                            alert('Added to cart!');
                          } else {
                            // Otherwise, we'd typically open the product detail to select a variant
                            alert('Please select a variant before adding to cart');
                          }
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                      >
                        <ShoppingCart size={16} />
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-500">
                <Heart size={40} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Your wishlist is empty</p>
                <p className="text-sm mt-2">Save items you like by clicking the heart icon on any product</p>
              </div>
            )}

            {/* Add All to Cart Button - Fixed */}
            {wishlist.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-4"
              >
                <ShoppingCart size={18} />
                Add All to Cart
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceGallery;