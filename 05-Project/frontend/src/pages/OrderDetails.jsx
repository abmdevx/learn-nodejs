import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const STATUS_STEPS = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'];

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading message="Loading order..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrder} />;
  if (!order) return null;

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="page-container">
      <Link to="/my-orders" className="back-link">
        ← Back to My Orders
      </Link>

      <h1>Order Details</h1>

      <div className="order-details-card">
        <div className="order-details-header">
          <div>
            <h3>{order.restaurant?.name}</h3>
            <p className="card-subtitle">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span className={`status-badge status-${order.status}`}>{order.status}</span>
        </div>

        {!isCancelled && (
          <div className="status-tracker">
            {STATUS_STEPS.map((step, index) => (
              <div
                key={step}
                className={`status-step ${index <= currentStepIndex ? 'status-step-active' : ''}`}
              >
                <div className="status-dot"></div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}

        <h4>Items</h4>
        <ul className="summary-item-list">
          {order.items.map((item, index) => (
            <li key={index}>
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="summary-total">
          <strong>Total</strong>
          <strong>${order.totalPrice.toFixed(2)}</strong>
        </div>

        <h4>Delivery Address</h4>
        <p>{order.deliveryAddress}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
