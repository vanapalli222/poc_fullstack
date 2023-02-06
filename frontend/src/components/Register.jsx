import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
function Register () {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [passwordCheck, setPasswordCheck] = useState();
const [displayName, setDisplayName] = useState();
const [error, setError] = useState();
const { setUserData } = useContext(UserContext);
const navigate = useNavigate();
const submit = async (e) => {
e.preventDefault();
try{
const newUser = {email, password, passwordCheck, displayName};
await axios.post("http://localhost:8082/api/users/register", newUser);
const loginResponse = await axios.post("http://localhost:8082/api/users/login", {
email, password
});
setUserData({
token: loginResponse.data.token,
user: loginResponse.data.user
});
localStorage.setItem("auth-token", loginResponse.data.token);
navigate("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};
return (
<div className="register">
<h2>Register</h2>
{error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
<form onSubmit={submit} className="p-3 mb-5 bg-white rounded">
<div className="form-group">
<label>Email: </label>
<input type="email" id="email" onChange={e => setEmail(e.target.value)} className="form-control"/>
</div>
<div className="form-group">
<label>Password: </label>
<input type="password" id="password" onChange={e => setPassword(e.target.value)} className="form-control"/>
</div>
<div claclassNamess="form-group">
<input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)} className="form-control"/>
</div>
<div class="form-group">
<label>Display name </label>
<input type="text" id="dsplay-name" onChange={e => setDisplayName(e.target.value)} className="form-control"/>
</div>
<input type="submit" value="Register" className="btn btn-primary" />
</form>
</div>
);
}
export default Register;