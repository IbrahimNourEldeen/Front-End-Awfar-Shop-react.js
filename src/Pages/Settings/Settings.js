import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
  const { customer } = useSelector((state) => state.auth); 
  const [formData, setFormData] = useState({
    user_id: customer.id,
    fullName: customer?.fullName || '',
    email: customer?.email || '',
    role: customer?.role || '',
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData)
  const handleUpdate = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.put('http://localhost/ecommerce/users/update_user.php', formData);
      if (response.data.status === "success") {
        navigate('/signup', { replace: true });
      } else {
        console.error('Failed to update user data:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user data', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">User Settings</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    className="form-control" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    value={formData.email} 
                    onChange={handleChange} 
                    disabled={!isEditable}  
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label>
                  <input 
                    type="text" 
                    id="role" 
                    name="role" 
                    className="form-control" 
                    value={formData.role} 
                    onChange={handleChange} 
                    disabled 
                  />
                </div>
              </form>
              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setIsEditable(!isEditable)} 
                >
                  {isEditable ? 'Cancel' : 'Edit'}
                </button>
                {isEditable && (
                  <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={handleUpdate} 
                    disabled={isLoading} 
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
  