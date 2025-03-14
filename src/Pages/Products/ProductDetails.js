import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../Components/Navbar/NavigationBar";
import Footer from "../../Components/Footer/Footer";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.products);
    const { customer, isAuthenticated } = useSelector((state) => state.auth);

    const product = products.find((product) => product.product_id === +id);

    const [quantity, setQuantity] = useState(1);
    const [statusMessage, setStatusMessage] = useState("");
    const [address, setAddress] = useState({
        country: "",
        city: "",
        street: "",
        postal_code: "",
    });

    if (!product) {
        return <p>Product not found.</p>;
    }

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate("/signup");
        } else {
            if (!address.country || !address.city || !address.street || !address.postal_code) {
                setStatusMessage("Please fill in all address fields.");
                return;
            }

            try {
                const response = await axios.post("http://localhost/ecommerce/orders/add_order.php", {
                    user_id: customer.id,
                    product_id: product.product_id,
                    quantity,
                    price: product.price,
                    total_price: product.price * quantity,
                    ...address,
                });

                if (response.data.status === "success") {
                    setStatusMessage("Order placed successfully. We will contact you soon.");
                } else {
                    setStatusMessage("Failed to place order. Please try again.");
                }
            } catch (error) {
                console.error("Error creating order:", error);
                setStatusMessage("An error occurred. Please try again later.");
            }
        }
    };

    const addToCart = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate("/signup");
        } else {
            try {
                await axios.post("http://localhost/ecommerce/cart/add_to_cart.php", {
                    user_id: customer.id,
                    product_id: product.product_id,
                    quantity,
                });
                setStatusMessage("Product added to cart.");
            } catch (error) {
                console.error("Error adding to cart:", error);
                setStatusMessage("Failed to add to cart. Please try again.");
            }
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="container py-5">
                <div className="card mb-3 border-0">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={`http://localhost/ecommerce/products/${product.image_path}`}
                                className="img-fluid rounded-start"
                                alt={product.title}
                            />
                        </div>

                        <div className="col-md-4">
                            <div className="card-body ms-lg-5 ms-md-3 ms-0">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>

                                <div className="d-flex align-items-center mb-3">
                                    <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                                    <input
                                        type="number"
                                        className="form-control text-center mx-2"
                                        value={quantity}
                                        readOnly
                                        style={{ maxWidth: "80px" }}
                                    />
                                    <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                                </div>

                                <button
                                    className="btn text-white"
                                    style={{ backgroundColor: "#d25795" }}
                                    onClick={addToCart}
                                >
                                    Add To Cart
                                </button>

                                {statusMessage && <p className="mt-3 text-success">{statusMessage}</p>}
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <form>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    className="form-control mb-2"
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="form-control mb-2"
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    className="form-control mb-2"
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="postal_code"
                                    placeholder="Postal Code"
                                    className="form-control mb-3"
                                    onChange={handleAddressChange}
                                />

                                <button
                                    className="btn text-white"
                                    style={{ backgroundColor: "#d25795" }}
                                    onClick={handleOrder}
                                >
                                    Order Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
