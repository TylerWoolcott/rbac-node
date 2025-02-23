import { useNavigate } from "react-router-dom"
import './Unathorized.scss'

const Unathorized = () => {
  const navigate = useNavigate()
  const handleBackToLogin = () => {
    navigate('/login')
  }
  return (
    <div className="unauthorized">
      <div className="unauthorized__container">
        <h1 className="unauthorized__title">Unathorized access</h1>
        <p className="unauthorized__message">You are unauthorized to access this page</p>
        <button className="unauthorized__button"
          onClick={handleBackToLogin}
        >
          Back to login
        </button>
      </div>

    </div>
  )
}

export default Unathorized
