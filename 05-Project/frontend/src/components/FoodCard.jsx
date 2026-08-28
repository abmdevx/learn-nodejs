import { useCart } from '../context/CartContext';

const FoodCard = ({ food, restaurant }) => {
  const { addToCart } = useCart();

  return (
    <div className="card food-card">
      <img
        src={food.image || 'https://via.placeholder.com/300x200?text=Food'}
        alt={food.name}
        className="card-image"
      />
      <div className="card-body">
        <div className="card-title-row">
          <h4>{food.name}</h4>
          <span className="price-tag">${food.price.toFixed(2)}</span>
        </div>
        <p className="card-description">{food.description}</p>
        <p className="food-category">{food.category}</p>

        {food.available ? (
          <button className="btn btn-primary btn-block" onClick={() => addToCart(food, restaurant)}>
            Add to Cart
          </button>
        ) : (
          <button className="btn btn-disabled btn-block" disabled>
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
