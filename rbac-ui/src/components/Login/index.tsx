import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

interface FormErrors {
  userName?: string,
  password?: string
}

function Login() {
  const [formData, setFormData] = useState({ userName: '', password: '' })
  const [error, setError] = useState<FormErrors>({})

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {}
    if (!formData.userName) {
      errors.userName = 'Please enter a valid username'
    } else if (!formData.password) {
      errors.password = 'Password is required'
    }
    return errors;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
    } else {
      console.log(formData)
    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    if (error[name as keyof FormErrors]) {
      setError((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-header'>
          <h1>Welcome back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              name='username'
              value={formData.userName}
              onChange={handleChange}
              placeholder='Enter your username'
              className={error.userName ? 'error' : ''}
            />
            {error.userName && (
              <div className='error-message'>
                {error.userName}
              </div>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>
              Password
            </label>
            <input
              type='text'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className={error.password ? 'error' : ''}
            />
            {error.password && (
              <div className='error-message'>
                {error.password}
              </div>
            )}
          </div>
          <button type='submit' className='auth-button'>Login</button>
        </form>
        <div className='auth-footer'>
          Don't have an account?
          <Link to='/signup'>
            Sign up
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Login
