import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/userContext";
function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const register = () => navigate("/register");
    const login = () => navigate("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "");
    };
    console.log(userData.user);
    return (
        <nav className="auth-options">
            {userData.user ? ( 
            <div>
             <div className="user-name">Welcome {userData.user.displayName}</div>
                <button className="btn btn-primary mr-2" onClick={logout}>Logout</button>
                </div>
            ) : (
                <>
                    <button className="btn btn-primary mr-2" onClick={register}>Sign Up</button>
                    <button className="btn btn-primary mr-2" onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}
export default AuthOptions;