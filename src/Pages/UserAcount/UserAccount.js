import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const UserAccount = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const handleLogout=(e)=>{
        e.preventDefault();
        dispatch(logout())
        navigate("/", { replace: true });
    }
  return (
    <div>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserAccount