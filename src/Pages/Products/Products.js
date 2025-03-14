import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProducts } from "../../features/productFeatures/productSlice";
import { NavLink } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost/ecommerce/products/get_products.php"
        );

        if (productsResponse.data.status === "success") {
          dispatch(AddProducts(productsResponse.data.data));
          console.log("Products Response", productsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchProductsAndCategories();
  }, [dispatch]);


  const handleDetails=()=>{


  }
  const handleUpdate=()=>{


  }

  const handleDelete = async (product_id) => {
    try {
      const response = await axios.delete(
        "http://localhost/ecommerce/products/delete_product.php",
        {
          data: { product_id },
        }
      );
  
      if (response.data.status === "success") {
        console.log("Category deleted successfully:", response.data.message);

        
          const prev=products.filter((product) => product.product_id !== product_id);
          dispatch(AddProducts(prev));
          
      } else {
        // setDelError(response.data.message || "Failed to delete category.");
      }
    } catch (error) {
      // setDelError(
      //   error.response?.data?.message ||
      //     "An error occurred while deleting the category."
      // );
    }
  };

  return (
    <div className="h-100 position-relative overflow-auto">
      <div className="m-5">
        <h2 className="text-center fw-bold">All Products</h2>
      </div>

      <div className="container">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="mb-4">
              <div className="row justify-content-center">
                <div className="col-10 py-2 shadow">
                    <div className="row">
                      <div className="col-12 col-md-2 col-lg-1">
                        <img
                          src={`http://localhost/ecommerce/products/${product.image_path}`}
                          // className="w-100"
                          style={{ height: "100px", objectFit: "cover" }}
                          alt={product.name}
                        />
                      </div>
                      <div className="col">
                        <h5 className="">{product.title}</h5>
                        <h5 className="">{product.description}</h5>
                        <div className="">
                          <button className="btn btn-info text-white" onClick={()=>handleDetails(product.product_id)}>Details</button>
                          <button className="btn btn-warning text-white mx-1" onClick={()=>handleUpdate(product.product_id)}>Update</button>
                          <button className="btn btn-danger text-white ms-1" onClick={()=>handleDelete(product.product_id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                </div>
                
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
