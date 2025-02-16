import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./routes/routes"
import { AuthProvider } from "./contexts/AuthContext"


function App() {
  return (
    <AuthProvider >
      <BrowserRouter>
        <Routes>
          {
            routes.map((route) => <Route
              key={route.path}
              path={route.path}
              element={route.element} />)
          }
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
