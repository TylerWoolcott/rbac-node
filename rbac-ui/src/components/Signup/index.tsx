import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Signup.scss'

interface FormErrors {
  username?: string,
  password?: string
}

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState<FormErrors>({})
  const { register } = useAuth()
  const navigate = useNavigate()

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
      try {
        const response = await register(formData)
        console.log(response)
        navigate('/login')
      } catch (error) {
        console.error(error)
        alert('Something went wrong while creating the user')
      }
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
          <h1>Sign up</h1>
          <p>Please enter your details to create a new account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>
              Username
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
          <button type='submit' className='auth-button'>Sign up</button>
        </form>
        <div className='auth-footer'>
          Already have an account?
          <Link to='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Signup
