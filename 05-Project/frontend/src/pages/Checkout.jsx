import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div className="page-container">
        <h1>Checkout</h1>
        <div className="state-container">
          <p>Your cart is empty. Add some food before checking out.</p>
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!deliveryAddress.trim()) {
      setError('Please provide a delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        restaurant: cart.restaurantId,
        items: cart.items.map((item) => ({
          food: item.foodId,
          quantity: item.quantity,
        })),
        deliveryAddress,
      };

      const { data } = await api.post('/orders', payload);
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="auth-form" onSubmit={handlePlaceOrder}>
          <h3>Delivery Details</h3>

          {error && <p className="form-error">{error}</p>}

          <label>
            Delivery Address
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Placing order...' : 'Place Order'}
          </button>
        </form>

        <div className="order-summary-box">
          <h3>Order Summary</h3>
          <p className="card-subtitle">{cart.restaurantName}</p>
          <ul className="summary-item-list">
            {cart.items.map((item) => (
              <li key={item.foodId}>
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
