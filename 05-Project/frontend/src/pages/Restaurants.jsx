import { useEffect, useState } from 'react';
import api from '../api/axios';
import RestaurantCard from '../components/RestaurantCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (cuisine) params.cuisine = cuisine;

      const { data } = await api.get('/restaurants', { params });
      setRestaurants(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load restaurants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRestaurants();
  };

  return (
    <div className="page-container">
      <h1>Restaurants</h1>

      <form className="filter-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by cuisine..."
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && <Loading message="Loading restaurants..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={fetchRestaurants} />}

      {!loading && !error && restaurants.length === 0 && (
        <div className="state-container">
          <p>No restaurants found. Try a different search.</p>
        </div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <div className="grid">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
