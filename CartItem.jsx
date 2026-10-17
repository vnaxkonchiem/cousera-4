import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <div>
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping} style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
