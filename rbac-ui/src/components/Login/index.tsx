import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Login.scss'

interface FormErrors {
  username?: string,
  password?: string
}

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState<FormErrors>({})
  const { login } = useAuth()

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {}
    if (!formData.username) {
      errors.username = 'Please enter a valid username'
    } else if (!formData.password) {
      errors.password = 'Password is required'
    }
    return errors;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)

    } else {
      const response = await login(formData)
      console.log(response)
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
              username
            </label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Enter your username'
              className={error.username ? 'error' : ''}
            />
            {error.username && (
              <div className='error-message'>
                {error.username}
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
