import React from "react"
import './Login.css'
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <table className="Auth-form-content">
          <tr>
            <th>
              <h3 className="Auth-form-title">Log In</h3>
            </th>
          </tr>
          <tr className="form-group mt-3">
            <td>
              <label>UserID</label>
            </td>
            <td>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter UserID"
            />
            </td>
          </tr>
          <tr className="form-group mt-3">
            <td>
              <label>Password</label>
            </td>
            <td>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
            </td>
          </tr>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary btn--medium btn-login">
              Login
            </button>
          </div>
        </table>
      </form>
    </div>
  )
  }