import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/userContext";
import ShowBookList from "./ShowBookList";
function Home() {
    const { userData} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData.user)
        navigate("/login");
    }, []);
    return (
        <div>
            {userData.user ? (
                <ShowBookList/>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}
export default Home;