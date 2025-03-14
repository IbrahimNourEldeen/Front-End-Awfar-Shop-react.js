import React, { useEffect, useState } from "react";
import "./Home.css";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../Components/Navbar/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { AddProducts } from "../../features/productFeatures/productSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost/ecommerce/products/get_products.php"
        );

        if (productsResponse.data.status === "success") {
          setProducts(productsResponse.data.data);
          dispatch(AddProducts(productsResponse.data.data));
          console.log("Products Response", productsResponse.data.data);
        }

        const categoriesResponse = await axios.get(
          "http://localhost/ecommerce/categories/get_categories.php"
        );

        if (categoriesResponse.data.status === "success") {
          setCategories(categoriesResponse.data.data);
          console.log("Categories Response", categoriesResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchProductsAndCategories();
  }, []);


  const productDetails = (id) => {
    navigate(`/${id}`);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
    }
  };
  

  return (
    <div className="bg-white">
      <NavigationBar onSearch={handleSearch} />

      <div className="container py-5">
        <div className="row">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.category_id} className="mb-4">
                <h2 className="mb-3">{category.name}</h2>
                <div className="row">
                  {
                    Products.filter(
                      (product) => product.category_id === category.category_id
                    ).length > 0 ? (
                      Products.filter(
                        (product) => product.category_id === category.category_id
                      ).map((product) => (
                        <div
                          className="col-12 col-md-4 col-lg-3 mb-3"
                          key={product.product_id}
                          onClick={() => productDetails(product.product_id)}

                        >
                          <div className="card shadow overflow-hidden h-100">
                            <img
                              src={`http://localhost/ecommerce/products/${product.image_path}`}
                              className="card-img-top py-2"
                              alt={product.title}
                              style={{ maxWidth: '250px', maxHeight: '350px' }}
                            />

                            <div className="card-body bg-light-subtle">
                              <h5 className="card-title">{product.title}</h5>
                              <div>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                              </div>
                              <p className="card-text text-danger fs-5 fw-bold d-flex justify-content-between">
                                 ${product.price}
                                 <button className="btn" onClick={()=>{console.log("click")}}>
                                 <i class="fa-solid fa-cart-shopping text-danger"></i>
                                 </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center w-100">There are no products in this category.</p>
                    )}
                </div>
              </div>
            ))
          ) : (
            <p>No products found...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
