import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import FoodCard from '../components/FoodCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [restaurantRes, foodsRes] = await Promise.all([
        api.get(`/restaurants/${id}`),
        api.get('/foods', { params: { restaurant: id } }),
      ]);
      setRestaurant(restaurantRes.data);
      setFoods(foodsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load restaurant details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading message="Loading restaurant..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;
  if (!restaurant) return null;

  // Group foods by category for a cleaner menu layout
  const foodsByCategory = foods.reduce((acc, food) => {
    const category = food.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(food);
    return acc;
  }, {});

  return (
    <div className="page-container">
      <Link to="/restaurants" className="back-link">
        ← Back to Restaurants
      </Link>

      <div className="restaurant-header">
        <img
          src={restaurant.image || 'https://via.placeholder.com/800x300?text=Restaurant'}
          alt={restaurant.name}
          className="restaurant-hero-image"
        />
        <div>
          <h1>{restaurant.name}</h1>
          <p className="card-subtitle">{restaurant.cuisine}</p>
          <p>{restaurant.description}</p>
          <p>📍 {restaurant.address}</p>
          <p>⭐ {restaurant.rating?.toFixed(1) || 'New'}</p>
        </div>
      </div>

      <h2>Menu</h2>

      {foods.length === 0 && (
        <div className="state-container">
          <p>This restaurant hasn't added any food items yet.</p>
        </div>
      )}

      {Object.keys(foodsByCategory).map((category) => (
        <div key={category} className="menu-category">
          <h3>{category}</h3>
          <div className="grid">
            {foodsByCategory[category].map((food) => (
              <FoodCard key={food._id} food={food} restaurant={restaurant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetails;
