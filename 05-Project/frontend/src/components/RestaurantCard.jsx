import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant._id}`} className="card restaurant-card">
      <img
        src={restaurant.image || 'https://via.placeholder.com/400x250?text=Restaurant'}
        alt={restaurant.name}
        className="card-image"
      />
      <div className="card-body">
        <div className="card-title-row">
          <h3>{restaurant.name}</h3>
          <span className="rating-badge">⭐ {restaurant.rating?.toFixed(1) || 'New'}</span>
        </div>
        <p className="card-subtitle">{restaurant.cuisine}</p>
        <p className="card-description">{restaurant.description}</p>
        <p className="card-address">📍 {restaurant.address}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
