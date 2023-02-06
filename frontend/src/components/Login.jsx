import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginResponse = await axios.post("http://localhost:8082/api/users/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            navigate("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };
    return (
        <div className="login">
            <h2 className="text-center">Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit} className="shadow p-3 mb-5 bg-white rounded login-form">
            <div class="form-group">
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)} className="form-control" />
                </div>
                <div class="form-group">
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} className="form-control"/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
        </div>
    );
}
export default Login;