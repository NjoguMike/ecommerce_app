import React from 'react'

export default function SignUpForm({ handleChange, handleSubmit, formData }) {
  return (
    <form onSubmit={handleSubmit} className="form-dialogue">
        <h2>Welcome to Our App!</h2>
        <div className="form-item">
            <label htmlFor="firstname"> First Name: </label>
            <input
                type="text"
                id="firstname"
                value={formData.firstname}
                autoComplete="off"
                onChange={handleChange}
            />
        </div>
        <div className="form-item">
            <label htmlFor="lastname"> Last Name: </label>
            <input
                type="text"
                id="lastname"
                value={formData.lastname}
                autoComplete="off"
                onChange={handleChange}
            />
        </div>
        <div className="form-item">
            <label htmlFor="email"> Email: </label>
            <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
            />
        </div>
        <div className="form-item">
            <label htmlFor="address"> Physical Address: </label>
            <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
            />
        </div>
        <div className="form-item">
            <label htmlFor="password"> Password: </label>
            <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
            />
        </div>
        <button className="signup-btn" type="submit">
        Sign Up
        </button>
    </form>
  )
}
