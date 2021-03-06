import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function Login() {
	const [email, setEmail] = useState("");
	var navigate = useNavigate();
	const [password, setPassword] = useState("");
	useEffect(() => {
		if (localStorage.getItem("user_id")) {
			navigate("/");
		}
	}, []);

	return (
		<div style={{ backgroundColor: "transparent" }}>
			<div className="maindivforlogin container">
				<div className="formdiv-for-login" style={{ padding: "30px" }}>
					<i className="fas fa-book-reader login-logo-g" />
					<div className="alert alert-danger mt-2" id="alert" role="alert">
  						Credential Error
					</div>
					<TextField
						id="outlined-password-input"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						autoComplete="current-password"
						style={{ width: "100%", marginBottom: "10px",marginTop: "5px"}}
					/>

					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						autoComplete="current-password"
						style={{ width: "100%" }}
					/>

					<Button
						variant="contained"
						color="primary"
						style={{ marginTop: "10px", width: "100%" }}
						onClick={() => {
							try {
								let res = axios.post("http://127.0.0.1:8000/gettoken/", {
									email: email,
									password: password,
								});
								res
									.then((a) => {
										console.log(a.data);
										let user = axios
											.post("http://127.0.0.1:8000/verify/", { email: email })
											.then((res) => {
												let user_data = res.data[0];
												console.log(user_data);
												localStorage.setItem("user_id", user_data.id);
												localStorage.setItem("token", a.data.access);
												localStorage.setItem("refresh_token", a.data.refresh);
												navigate("/");
											});
									})
									.catch((error) => {
										let alert = document.getElementById('alert')
										alert.style.display = "block"
										// alert("Credential Error");
									});
							} catch (error) {
								console.log(error);
							}
						}}
					>
						Log In
					</Button>
					<NavLink to="/signup">
						<h4 style={{ fontSize: "12px", marginTop: "15px" }}>
							Register For a New Account
						</h4>
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Login;
