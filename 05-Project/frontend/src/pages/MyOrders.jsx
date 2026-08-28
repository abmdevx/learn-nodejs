import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const statusColors = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  preparing: 'status-preparing',
  'out-for-delivery': 'status-out-for-delivery',
  delivered: 'status-delivered',
  cancelled: 'status-cancelled',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading message="Loading your orders..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  if (orders.length === 0) {
    return (
      <div className="page-container">
        <h1>My Orders</h1>
        <div className="state-container">
          <p>You haven't placed any orders yet.</p>
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>My Orders</h1>

      <div className="order-list">
        {orders.map((order) => (
          <Link to={`/orders/${order._id}`} key={order._id} className="order-row">
            <div>
              <h4>{order.restaurant?.name || 'Restaurant'}</h4>
              <p className="card-subtitle">
                {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
              </p>
            </div>
            <div className="order-row-right">
              <span className={`status-badge ${statusColors[order.status] || ''}`}>
                {order.status}
              </span>
              <strong>${order.totalPrice.toFixed(2)}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
