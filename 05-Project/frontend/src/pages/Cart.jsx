import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="page-container">
        <h1>Your Cart</h1>
        <div className="state-container">
          <p>Your cart is empty.</p>
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Your Cart</h1>
      <p className="card-subtitle">Ordering from: {cart.restaurantName}</p>

      <div className="cart-list">
        {cart.items.map((item) => (
          <div key={item.foodId} className="cart-item">
            <img
              src={item.image || 'https://via.placeholder.com/80x80?text=Food'}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>

            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.foodId)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button className="btn btn-primary btn-lg" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
