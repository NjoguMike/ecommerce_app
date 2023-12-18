import React, { useState } from "react";

export default function ProfileSettings({ userData = {} }) {
  const { id, firstname, lastname, email, address, password } = userData
  const userAPIData = { id, firstname, lastname, email, address, password }
  console.log({ userAPIData })

  const [formData, setFormData] = useState(userAPIData);


  function handleSubmit(e) {
    e.preventDefault();

    // Remove created_at field because it needs to be parsed to DateTime in the backend
    // Yet we don't have to pass it because it gets created in the backend

    const { created_at: fda, ...fd } = formData;
    console.log({ formData })

    fetch(`http://127.0.0.1:5555/customers/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fd),
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
  }

  function handleChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    const fd = { ...userAPIData, ...formData, [id]: value }
    console.log(fd)
    setFormData(fd);
  }

  return (
    <div className="settings-dialogue">
      <h4 className="generic-h4">Profile Settings</h4>
      <form onSubmit={handleSubmit}>
        <div className="profile-grid">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder={userData.firstname}
              value={formData.firstname}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder={userData.lastname}
              value={formData.lastname}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder={userData.email}
              value={formData.email}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Physical Address</label>
            <input
              type="text"
              id="address"
              placeholder={userData.address}
              value={formData.address}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // placeholder={userData.password}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="save-btn" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
