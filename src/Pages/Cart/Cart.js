import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { customer } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost/ecommerce/cart/all_cart_data.php?user_id=${customer.id}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [customer.id]);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost/ecommerce/cart/delete_from_cart.php`,
        {
          data: { user_id: customer.id, product_id: productId },
        }
      );
      setCartItems((prev) =>
        prev.filter((item) => item.product_id !== productId)
      );
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove product.");
    }
  };

  const navigate = useNavigate();

  const productDetails = (id) => {
    navigate(`/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-12 mb-4" key={item.cart_id}>
              <div
                className="card h-100 d-flex flex-row align-items-center p-3"
                style={{ maxHeight: "200px" }}
              >
                <img
                  src={`http://localhost/ecommerce/products/${item.image_path}`}
                  className="img-fluid"
                  alt={item.product_name}
                  style={{
                    maxWidth: "120px",
                    maxHeight: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{item.product_name}</h5>
                  <p className="card-text mb-1">{item.description}</p>
                  <div className="d-flex justify-content-between">
                    <span className="card-text mb-1">
                      Quantity: {item.quantity}
                    </span>
                    <span className="card-text mb-1">Price: ${item.price}</span>
                  </div>
                  <p className="card-text mb-1 text-end">
                    <span>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                  <div className="button-container">
                    <button
                      className="btn text-white me-2 d-inline-block"
                      style={{ backgroundColor: "#d25795", width: "48%" }}
                      onClick={() => productDetails(item.product_id)}
                    >
                      Order Now
                    </button>
                    <button
                      className="btn btn-danger d-inline-block"
                      style={{ width: "48%" }}  
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
