import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Swal from "sweetalert2";
import SignUpForm from "../../utils/form";
import "../Shop/SignUpForm.css"

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const emptyField = Object.keys(formData).find(
      (key) => !formData[key].trim()
    )
    if (emptyField){
      Swal.fire({
        title: "Invalid!",
        text: `Please enter a valid ${emptyField}`,
        icon:"error",
        confirmButtonText:"Okay"
      })
      return
    }

    fetch("http://127.0.0.1:5555/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((r) => {
        alert(`Welcome ${r.lastname}`);
        navigate("/login", { replace: true })
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Invalid")
      })
  }

  return (
    <div className="login-dialogue">
      <img className="logo" alt="logo" src={Logo} />
      <SignUpForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}
