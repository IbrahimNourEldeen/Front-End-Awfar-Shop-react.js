import axios from "axios";
import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState();
  const [errorMessage, setErrorMessage] = useState();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost/ecommerce/categories/get_categories.php");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const base64Data = base64Image.split(',')[1];
        setProduct({
          ...product,
          image: base64Data,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: product.title,
      description: product.description,
      price: parseFloat(product.price),
      category_id: product.category_id,
      image: product.image,
    };

    try {
      const response = await axios.post(
        "http://localhost/ecommerce/products/insert_product.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if(response.data.status==="success"){
          setSuccess(response.data.message)
      }else{
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-100 position-relative overflow-auto">
      <div className=" m-5">
        <h2 className="text-center fw-bold">Add Product</h2>
        <form onSubmit={handleSubmit} className="col-12 col-md-8 col-lg-5">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Product title"
            value={product.title}
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            className="form-control my-2"
            name="description"
            placeholder="Product description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Product price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <select
            className="form-select my-2"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose Category
            </option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            className="form-control my-2"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button type="submit" className="btn btn-dark d-block mx-auto">
            Upload Product
          </button>
          {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
          {success && <div className="bg-success-subtle alert-success mt-2 p-2 rounded-2">{success}</div>}
        </form>
      </div>
    </div>

  );
};

export default AddProduct;
