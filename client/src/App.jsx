import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./screens/rootlayout"
import HomePage from "./screens/homepage"
import { AnimePage } from "./screens/animepage"
import { LoginPage } from "./screens/loginpage"
import { AdminPage } from "./screens/adminpage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index:true,
        element: <HomePage />
      },
      {
        path:"anime/:animeTitle",
        element: <AnimePage />
      },
      {
        path:"login",
        element: <LoginPage />
      },
      {
        path: "Admin",
        element: <AdminPage />
      }
    ]
  }
])
function App() {
 return (<RouterProvider router={router} />)

}

export default App

