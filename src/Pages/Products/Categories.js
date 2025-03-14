import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [delError, setDelError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost/ecommerce/categories/get_categories.php"
        );

        if (response.data.status === "success") {
          setCategories(response.data.data);
          console.log("Categories Response", response.data.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a category name");
      setSuccess(null);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/ecommerce/categories/add_category.php",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setSuccess("Category added successfully!");
        setError(null);
        setName("");
      } else {
        setError("Failed to add category. Please try again.");
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      setSuccess(null);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost/ecommerce/categories/delete_category.php",
        {
          data: { id },
        }
      );
  
      if (response.data.status === "success") {
        console.log("Category deleted successfully:", response.data.message);
        setCategories((prev) =>
          prev.filter((category) => category.category_id !== id)
        );
      } else {
        setDelError(response.data.message || "Failed to delete category.");
      }
    } catch (error) {
      setDelError(
        error.response?.data?.message ||
          "An error occurred while deleting the category."
      );
    }
  };
    
  return (
    <div className="h-100 position-relative overflow-auto">
      <div className="m-4">
        <div className="shadow p-2">
          <h2 className="text-center">Add Category</h2>
          <div className="row">
            <div className="col-12 col-md-6 mx-auto">
              <form onSubmit={addCategory} className=" mx-auto">
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="New category"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError(null);
                      }}
                    />
                    <button type="submit" className="btn btn-info">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
          {success && (
            <p className="text-success text-center mt-3">{success}</p>
          )}
        </div>

        <div className="shadow p-2 mt-4">
          <h2 className="text-center">All Categories</h2>
          {categories &&
            categories.map((category) => (
              <div className="row bg-secondary-subtle g-2 my-2 rounded-2" key={category.category_id}>
                <div className="col">{category.name}</div>
                <div className="col text-center">{category.created_at}</div>
                <div className="col text-end">
                  <button className="btn btn-danger mb-2" onClick={()=>deleteCategory(category.category_id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
