import React, { useState, useEffect } from 'react';
import F1 from '../assets/F1.png';
import M1 from '../assets/M1.png';
import M2 from '../assets/M2.png';
import P1 from '../assets/P1.png';
import T1 from '../assets/T1.png';
import T2 from '../assets/T2.png';
import person from '../assets/person.png';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, CreditCard, Send } from 'lucide-react';

const ResourceCard = ({ resource, addToCart, addToWishlist, isInWishlist }) => {
  const [isProductPageOpen, setIsProductPageOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  
  // Update local state when the prop changes
  useEffect(() => {
    setIsWishlisted(isInWishlist);
  }, [isInWishlist]);

  // Enhanced product data with initial reviews
  const enhancedProduct = {
    ...resource,
    description: "A comprehensive design resource meticulously crafted to elevate your product presentation and streamline your design workflow. Perfect for designers, product managers, and startup teams looking to create compelling visual narratives.",
    variants: {
      'presentation': [
        { name: 'Basic', price: 19.99, features: ['Basic templates', 'Standard support'] },
        { name: 'Pro', price: 39.99, features: ['Premium templates', 'Priority support', 'Source files'] },
      ],
      'template': [
        { name: 'Single Use', price: 14.99, features: ['One-time use', 'Basic support'] },
        { name: 'Team', price: 29.99, features: ['Team usage', 'Team support', 'Collaboration'] }
      ],
      'pitch deck': [
        { name: 'Startup', price: 24.99, features: ['Essential slides', 'Basic support'] },
        { name: 'Growth', price: 49.99, features: ['Advanced slides', 'Priority support'] },
      ]
    },
    images: resource.type === 'presentation' 
      ? [P1, M1, M2, F1] 
      : resource.type === 'template' 
        ? [M1, P1, F1, M2] 
        : [F1, M2, P1, M1],
    initialReviews: [
      { 
        name: "Jane Cooper",
        rating: 5,
        comment: "Absolutely incredible resource! The templates are well-designed and easy to customize.",
        date: "2 weeks ago",
        avatar: person
      },
      {
        name: "John Smith",
        rating: 4,
        comment: "Great value for money. Would highly recommend for any design team.",
        date: "1 month ago",
        avatar: person
      }
    ]
  };

  // Initialize reviews from enhancedProduct on component mount
  useEffect(() => {
    setReviews(enhancedProduct.initialReviews);
    calculateAverageRating(enhancedProduct.initialReviews);
  }, []);

  // Function to calculate average rating
  const calculateAverageRating = (reviewList) => {
    if (reviewList.length === 0) return 0;
    
    const sum = reviewList.reduce((total, review) => total + review.rating, 0);
    const average = (sum / reviewList.length).toFixed(1);
    setAverageRating(average);
  };

  // Function to handle adding a new review
  const handleAddReview = () => {
    if (!newReview.comment.trim()) return;
    
    const currentDate = new Date();
    const formattedDate = "Just now";
    
    const reviewToAdd = {
      name: "You", // Could be replaced with actual user name from props/context
      rating: newReview.rating,
      comment: newReview.comment,
      date: formattedDate,
      avatar: person // Default avatar, could be replaced with user avatar
    };
    
    const updatedReviews = [...reviews, reviewToAdd];
    setReviews(updatedReviews);
    calculateAverageRating(updatedReviews);
    
    // Reset form
    setNewReview({ rating: 5, comment: '' });
  };

  // Determine which image to use for this specific card based on resource type
  const getCardImage = () => {
    switch(resource.type) {
      case 'presentation':
        return F1;
      case 'template':
        return M2;
      case 'pitch deck':
        return T1;
      default:
        return T2;
    }
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % enhancedProduct.images.length);
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? enhancedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Interactive star rating selector for new reviews
  const renderStarSelector = () => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setNewReview({...newReview, rating: index + 1})}
        className="focus:outline-none"
      >
        <Star 
          size={20}
          className={`${
            index < newReview.rating 
              ? 'text-yellow-500 fill-current' 
              : 'text-gray-300 hover:text-yellow-300'
          } transition-colors`}
        />
      </button>
    ));
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      // Create cart item with selected variant
      const cartItem = {
        ...resource,
        variant: selectedVariant,
        title: resource.title,
        id: resource.id
      };
      
      // Use the addToCart function passed from parent component
      addToCart(cartItem);
      
      // Close the product modal after adding to cart
      setIsProductPageOpen(false);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    
    // First update local state for immediate feedback
    setIsWishlisted(!isWishlisted);
    
    // Get default variant if none is selected yet
    const defaultVariant = selectedVariant || enhancedProduct.variants[resource.type][0];
    
    // Create wishlist item with default or selected variant
    const wishlistItem = {
      ...resource,
      variant: defaultVariant,
      title: resource.title,
      id: resource.id
    };
    
    // Use the addToWishlist function passed from parent component
    addToWishlist(wishlistItem);
  };

  // Get background color based on resource type for visual variety
  const getCardBgColor = () => {
    switch(resource.type) {
      case 'presentation':
        return 'from-blue-50 to-indigo-50';
      case 'template':
        return 'from-emerald-50 to-teal-50';
      case 'pitch deck':
        return 'from-amber-50 to-orange-50';
      default:
        return 'from-gray-50 to-slate-50';
    }
  };

  // Get accent color based on resource type
  const getAccentColor = () => {
    switch(resource.type) {
      case 'presentation':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'template':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'pitch deck':
        return 'bg-amber-600 hover:bg-amber-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  // Main Card Component (Displayed in Grid/List)
  return (
    <>
      {/* Enhanced Product Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Card Image */}
        <div 
          className="relative aspect-[4/3] overflow-hidden"
          onClick={() => setIsProductPageOpen(true)}
        >
          <img 
            src={getCardImage()} 
            alt={enhancedProduct.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
          >
            <Heart 
              size={18} 
              className={`${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} transition-colors`}
            />
          </button>
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 ${resource.type === 'presentation' ? 'bg-blue-600' : resource.type === 'template' ? 'bg-emerald-600' : 'bg-amber-600'} text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize`}>
            {resource.type}
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-5 flex flex-col flex-grow" onClick={() => setIsProductPageOpen(true)}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{resource.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={14} className="fill-current" />
              <span className="text-xs font-medium">{averageRating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-2">By {resource.author}</p>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {enhancedProduct.description.substring(0, 100)}...
          </p>
          
          <div className="mt-auto flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500">
              <span className={resource.type === 'presentation' ? 'text-blue-600' : resource.type === 'template' ? 'text-emerald-600' : 'text-amber-600'}>
                ${enhancedProduct.variants[resource.type][0].price}
              </span> - <span className={resource.type === 'presentation' ? 'text-blue-600' : resource.type === 'template' ? 'text-emerald-600' : 'text-amber-600'}>
                ${enhancedProduct.variants[resource.type][1].price}
              </span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {resource.views}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {resource.likes}
              </span>
            </div>
          </div>
        </div>
        
        {/* Call-to-action Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsProductPageOpen(true);
            }}
            className={`w-full py-2.5 ${getAccentColor()} text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}
          >
            <ShoppingCart size={16} />
            View Details
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {isProductPageOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button 
                onClick={() => setIsProductPageOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg z-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Gallery with gradient background matching product type */}
                <div className={`bg-gradient-to-br ${getCardBgColor()} p-8`}>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={enhancedProduct.images[currentImageIndex]}
                      alt={`Product view ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    <button 
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full hover:bg-white shadow-md transition-colors"
                    >
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    <button 
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full hover:bg-white shadow-md transition-colors"
                    >
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 mt-6 justify-center">
                    {enhancedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden shadow-md transition-all ${
                          currentImageIndex === index 
                            ? 'ring-2 ring-offset-2 ' + (resource.type === 'presentation' ? 'ring-blue-600' : resource.type === 'template' ? 'ring-emerald-600' : 'ring-amber-600')
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Product Stats */}
                  <div className="mt-8 flex justify-between text-sm text-gray-500 bg-white rounded-lg p-4 shadow-md">
                    <div className="text-center">
                      <p className="font-medium text-gray-900 mb-1">{resource.views}</p>
                      <p>Views</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900 mb-1">{resource.likes}</p>
                      <p>Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900 mb-1">{reviews.length}</p>
                      <p>Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900 mb-1">{averageRating}/5</p>
                      <p>Rating</p>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-8">
                  <div className="pb-6 mb-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 ${resource.type === 'presentation' ? 'bg-blue-100 text-blue-800' : resource.type === 'template' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} text-xs font-medium rounded-full mb-3 capitalize`}>
                          {resource.type}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{enhancedProduct.title}</h1>
                        <p className="text-gray-600">by <span className="font-medium">{enhancedProduct.author}</span></p>
                      </div>
                      <button 
                        onClick={handleToggleWishlist}
                        className={`p-2.5 rounded-full transition-colors ${
                          isWishlisted 
                            ? 'text-red-500 bg-red-50' 
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <Heart size={22} className={isWishlisted ? 'fill-current' : ''} />
                      </button>
                    </div>

                    {/* Rating Summary */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex">
                        {renderStars(Math.round(averageRating))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({reviews.length} reviews)
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700">
                      {enhancedProduct.description}
                    </p>
                  </div>

                  {/* Variant Selection */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Choose Your Plan</h3>
                    <div className="space-y-4">
                      {enhancedProduct.variants[resource.type].map((variant) => (
                        <button
                          key={variant.name}
                          onClick={() => setSelectedVariant(variant)}
                          className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                            selectedVariant?.name === variant.name 
                              ? (resource.type === 'presentation' ? 'border-blue-600 bg-blue-50' : resource.type === 'template' ? 'border-emerald-600 bg-emerald-50' : 'border-amber-600 bg-amber-50')
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                            <span className={`font-bold ${resource.type === 'presentation' ? 'text-blue-600' : resource.type === 'template' ? 'text-emerald-600' : 'text-amber-600'}`}>
                              ${variant.price}
                            </span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {variant.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <svg className={`w-4 h-4 ${resource.type === 'presentation' ? 'text-blue-500' : resource.type === 'template' ? 'text-emerald-500' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buy Now and Add to Cart Buttons */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant}
                      className={`py-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 transition-colors ${
                        selectedVariant 
                          ? (resource.type === 'presentation' ? 'bg-blue-600 hover:bg-blue-700' : resource.type === 'template' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700') + ' text-white'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant}
                      className={`py-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 transition-colors border-2 ${
                        selectedVariant 
                          ? (resource.type === 'presentation' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : resource.type === 'template' ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50' : 'border-amber-600 text-amber-600 hover:bg-amber-50')
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <CreditCard size={20} />
                      Buy Now
                    </button>
                  </div>

                  {/* Price Display */}
                  {selectedVariant && (
                    <div className="text-center mb-8">
                      <span className="text-lg text-gray-500">Selected plan: </span>
                      <span className={`text-xl font-bold ${resource.type === 'presentation' ? 'text-blue-600' : resource.type === 'template' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {selectedVariant.name} - ${selectedVariant.price}
                      </span>
                    </div>
                  )}

                  {/* Reviews Section */}
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-6 text-gray-900">
                      Customer Reviews
                      <span className="text-base font-normal text-gray-500 ml-2">
                        ({reviews.length})
                      </span>
                    </h3>
                    
                    {/* Add Review Form */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <h4 className="font-medium text-gray-900 mb-4">Add Your Review</h4>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {renderStarSelector()}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({newReview.rating}/5)
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                          placeholder="Share your thoughts about this product..."
                          className="flex-grow p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                        ></textarea>
                        <button
                          onClick={handleAddReview}
                          disabled={!newReview.comment.trim()}
                          className={`px-4 self-end rounded-lg font-medium text-center flex items-center justify-center gap-2 ${
                            newReview.comment.trim() 
                              ? (resource.type === 'presentation' ? 'bg-blue-600 hover:bg-blue-700' : resource.type === 'template' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700') + ' text-white'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          } h-12`}
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Review List */}
                    <div className="space-y-6">
                      {reviews.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Be the first to review this product!</p>
                      ) : (
                        reviews.map((review, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-gray-500 text-xs">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceCard;