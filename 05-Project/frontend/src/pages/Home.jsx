import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food, Delivered Fast</h1>
          <p>Order from your favorite local restaurants in just a few clicks.</p>
          <Link to="/restaurants" className="btn btn-primary btn-lg">
            Browse Restaurants
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>🍽️ Wide Selection</h3>
          <p>Choose from a variety of restaurants and cuisines near you.</p>
        </div>
        <div className="feature">
          <h3>⚡ Fast Delivery</h3>
          <p>Your food arrives hot and fresh, right to your doorstep.</p>
        </div>
        <div className="feature">
          <h3>📦 Track Orders</h3>
          <p>Follow your order status from confirmation to delivery.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
