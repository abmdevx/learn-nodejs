import { useEffect, useState } from 'react';
import api from '../api/axios';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'out-for-delivery',
  'delivered',
  'cancelled',
];

const emptyRestaurantForm = {
  _id: null,
  name: '',
  description: '',
  image: '',
  cuisine: '',
  address: '',
  rating: '',
};

const emptyFoodForm = {
  _id: null,
  restaurant: '',
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  available: true,
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('restaurants');

  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [restaurantForm, setRestaurantForm] = useState(emptyRestaurantForm);
  const [foodForm, setFoodForm] = useState(emptyFoodForm);

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [restaurantsRes, foodsRes, ordersRes] = await Promise.all([
        api.get('/restaurants'),
        api.get('/foods'),
        api.get('/orders'),
      ]);
      setRestaurants(restaurantsRes.data);
      setFoods(foodsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ---------- Restaurant CRUD ----------
  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: restaurantForm.name,
      description: restaurantForm.description,
      image: restaurantForm.image,
      cuisine: restaurantForm.cuisine,
      address: restaurantForm.address,
      rating: restaurantForm.rating ? Number(restaurantForm.rating) : 0,
    };

    try {
      if (restaurantForm._id) {
        const { data } = await api.put(`/restaurants/${restaurantForm._id}`, payload);
        setRestaurants((prev) => prev.map((r) => (r._id === data._id ? data : r)));
      } else {
        const { data } = await api.post('/restaurants', payload);
        setRestaurants((prev) => [data, ...prev]);
      }
      setRestaurantForm(emptyRestaurantForm);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save restaurant.');
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setRestaurantForm({
      _id: restaurant._id,
      name: restaurant.name,
      description: restaurant.description || '',
      image: restaurant.image || '',
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      rating: restaurant.rating || '',
    });
    setActiveTab('restaurants');
  };

  const handleDeleteRestaurant = async (id) => {
    if (!window.confirm('Delete this restaurant and all its food items?')) return;
    try {
      await api.delete(`/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
      setFoods((prev) => prev.filter((f) => f.restaurant?._id !== id && f.restaurant !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete restaurant.');
    }
  };

  // ---------- Food CRUD ----------
  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    if (!foodForm.restaurant) {
      alert('Please select a restaurant for this food item.');
      return;
    }

    const payload = {
      restaurant: foodForm.restaurant,
      name: foodForm.name,
      description: foodForm.description,
      price: Number(foodForm.price),
      category: foodForm.category,
      image: foodForm.image,
      available: foodForm.available,
    };

    try {
      if (foodForm._id) {
        const { data } = await api.put(`/foods/${foodForm._id}`, payload);
        setFoods((prev) => prev.map((f) => (f._id === data._id ? data : f)));
      } else {
        const { data } = await api.post('/foods', payload);
        setFoods((prev) => [data, ...prev]);
      }
      setFoodForm(emptyFoodForm);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save food item.');
    }
  };

  const handleEditFood = (food) => {
    setFoodForm({
      _id: food._id,
      restaurant: food.restaurant?._id || food.restaurant,
      name: food.name,
      description: food.description || '',
      price: food.price,
      category: food.category || '',
      image: food.image || '',
      available: food.available,
    });
    setActiveTab('foods');
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    try {
      await api.delete(`/foods/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete food item.');
    }
  };

  // ---------- Orders ----------
  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === data._id ? data : o)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status.');
    }
  };

  if (loading) return <Loading message="Loading admin dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAll} />;

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'restaurants' ? 'tab-btn-active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants
        </button>
        <button
          className={`tab-btn ${activeTab === 'foods' ? 'tab-btn-active' : ''}`}
          onClick={() => setActiveTab('foods')}
        >
          Food Items
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'tab-btn-active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {/* ---------------- RESTAURANTS TAB ---------------- */}
      {activeTab === 'restaurants' && (
        <div className="admin-section">
          <form className="admin-form" onSubmit={handleRestaurantSubmit}>
            <h3>{restaurantForm._id ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
            <div className="form-grid">
              <label>
                Name
                <input
                  type="text"
                  value={restaurantForm.name}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Cuisine
                <input
                  type="text"
                  value={restaurantForm.cuisine}
                  onChange={(e) =>
                    setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  value={restaurantForm.address}
                  onChange={(e) =>
                    setRestaurantForm({ ...restaurantForm, address: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Image URL
                <input
                  type="text"
                  value={restaurantForm.image}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, image: e.target.value })}
                />
              </label>
              <label>
                Rating (0-5)
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={restaurantForm.rating}
                  onChange={(e) =>
                    setRestaurantForm({ ...restaurantForm, rating: e.target.value })
                  }
                />
              </label>
              <label className="form-grid-full">
                Description
                <textarea
                  value={restaurantForm.description}
                  onChange={(e) =>
                    setRestaurantForm({ ...restaurantForm, description: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="btn btn-primary">
                {restaurantForm._id ? 'Update Restaurant' : 'Add Restaurant'}
              </button>
              {restaurantForm._id && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setRestaurantForm(emptyRestaurantForm)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="admin-table">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className="admin-row">
                <div>
                  <strong>{restaurant.name}</strong>
                  <p className="card-subtitle">
                    {restaurant.cuisine} · ⭐ {restaurant.rating?.toFixed(1) || 'New'}
                  </p>
                </div>
                <div className="admin-row-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => handleEditRestaurant(restaurant)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRestaurant(restaurant._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {restaurants.length === 0 && <p>No restaurants yet.</p>}
          </div>
        </div>
      )}

      {/* ---------------- FOODS TAB ---------------- */}
      {activeTab === 'foods' && (
        <div className="admin-section">
          <form className="admin-form" onSubmit={handleFoodSubmit}>
            <h3>{foodForm._id ? 'Edit Food Item' : 'Add Food Item'}</h3>
            <div className="form-grid">
              <label>
                Restaurant
                <select
                  value={foodForm.restaurant}
                  onChange={(e) => setFoodForm({ ...foodForm, restaurant: e.target.value })}
                  required
                >
                  <option value="">Select a restaurant</option>
                  {restaurants.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Name
                <input
                  type="text"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Price
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={foodForm.price}
                  onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                  required
                />
              </label>
              <label>
                Category
                <input
                  type="text"
                  value={foodForm.category}
                  onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                />
              </label>
              <label>
                Image URL
                <input
                  type="text"
                  value={foodForm.image}
                  onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
                />
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={foodForm.available}
                  onChange={(e) => setFoodForm({ ...foodForm, available: e.target.checked })}
                />
                Available
              </label>
              <label className="form-grid-full">
                Description
                <textarea
                  value={foodForm.description}
                  onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                />
              </label>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="btn btn-primary">
                {foodForm._id ? 'Update Food' : 'Add Food'}
              </button>
              {foodForm._id && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setFoodForm(emptyFoodForm)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="admin-table">
            {foods.map((food) => (
              <div key={food._id} className="admin-row">
                <div>
                  <strong>{food.name}</strong>
                  <p className="card-subtitle">
                    {food.restaurant?.name || 'Unknown restaurant'} · ${food.price.toFixed(2)}
                    {!food.available && ' · Unavailable'}
                  </p>
                </div>
                <div className="admin-row-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => handleEditFood(food)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFood(food._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {foods.length === 0 && <p>No food items yet.</p>}
          </div>
        </div>
      )}

      {/* ---------------- ORDERS TAB ---------------- */}
      {activeTab === 'orders' && (
        <div className="admin-section">
          <div className="admin-table">
            {orders.map((order) => (
              <div key={order._id} className="admin-row admin-order-row">
                <div>
                  <strong>{order.restaurant?.name || 'Restaurant'}</strong>
                  <p className="card-subtitle">
                    {order.user?.name} ({order.user?.email}) · {order.items.length} item(s) · $
                    {order.totalPrice.toFixed(2)}
                  </p>
                  <p className="card-subtitle">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            {orders.length === 0 && <p>No orders yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
