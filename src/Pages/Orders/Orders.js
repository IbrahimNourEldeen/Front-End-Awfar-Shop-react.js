import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost/ecommerce/orders/get_orders.php"
        );

        if (response.data.status === "success") {
          setOrders(response.data.data);
          console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
            response.data.data
          );
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  const removeOrder = async (order_id) => {
    try {
      const response = await axios.delete(
        "http://localhost/ecommerce/orders/delete_order.php",
        {
          data: { order_id },
        }
      );

      if (response.data.status === "success") {
        console.log("order deleted successfully:", response.data.message);
        setOrders((prev) =>
          prev.filter((order) => order.order_id !== order_id)
        );
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateOrderStatus = (order_id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === order_id ? { ...order, status: newStatus } : order
      )
    );
  };

  const completeOrder = async (order_id) => {
    try {
      const response = await axios.put(
        "http://localhost/ecommerce/orders/update_status.php",
        {
          order_id,
          status: "completed",
        }
      );

      if (response.data.status === "success") {
        console.log("order completed successfully:", response.data.message);
        updateOrderStatus(order_id, "completed");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const cancelOrder = async (order_id) => {
    try {
      const response = await axios.put(
        "http://localhost/ecommerce/orders/update_status.php",
        {
          order_id,
          status: "canceled",
        }
      );

      if (response.data.status === "success") {
        console.log("order canceld successfully:", response.data.message);
        updateOrderStatus(order_id, "canceled");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-100 position-relative overflow-auto">
      <div className="container my-5">
        <h1 className="text-center mb-4">Orders</h1>
        <div className="row">
          {orders.map((order, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.order_id}</h5>
                  <p className="card-text">
                    Customer Name: <strong>{order.full_name}</strong>
                  </p>
                  <p className="card-text">
                    Phone Number: <strong>{order.phone_number}</strong>
                  </p>
                  <p className="card-text">
                    Status:
                    <span
                      className={`badge ${
                        order.status === "completed"
                          ? "bg-success"
                          : order.status === "pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="card-text">
                    Created At: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <h6 className="mt-3">Addresses</h6>
                  {order.addresses && order.addresses.length > 0 ? (
                    <ul className="list-group">
                      {order.addresses.map((address, addrIndex) => (
                        <li key={addrIndex} className="list-group-item">
                          {address.street}, {address.city}, {address.country},{" "}
                          {address.postal_code}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No addresses available.</p>
                  )}
                  <h6 className="mt-3">Product Details</h6>
                  <ul className="list-group list-group-flush">
                    {order.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="list-group-item d-flex align-items-center"
                      >
                        <div
                          className="mr-3"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <img
                            src={`http://localhost/ecommerce/products/${detail.product_image}`}
                            alt={detail.product_name}
                            className="img-fluid"
                          />
                        </div>
                        <div>
                          <strong>{detail.product_name}</strong>
                          <br />
                          <strong>Quantity:</strong> {detail.quantity} <br />
                          <strong>Price:</strong> {detail.price} EGP <br />
                          <strong>Total:</strong> {detail.total_price} EGP
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer text-center">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Order Actions"
                  >
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => completeOrder(order.order_id)}
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => cancelOrder(order.order_id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeOrder(order.order_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
