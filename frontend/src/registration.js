import React, { useState } from "react"
// import './register.css'

function Registration10() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      console.log("Form submitted successfully", formData)
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    }
  }

  const validate = () => {
    const errors = {}

    if (!formData.username) errors.username = "Username is required"
    if (!formData.email) errors.email = "Email is required"
    if (!formData.password) errors.password = "Password is required"
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <div className="App">
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="error">{errors.username}</div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="error">{errors.email}</div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="error">{errors.password}</div>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="error">{errors.confirmPassword}</div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
  // return (
  //   <div>Hello World</div>
  // )
}



export default Registration10
