import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")

	const handleClick = () => {
		actions.signup(email, password)
	};


	return (
		<div className="text-center mt-5">
		<h1>Sign Up</h1>
		
		<div>

			<input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<button onClick={handleClick}>Sign Up</button>
		</div>
		

	</div>
	)
};

