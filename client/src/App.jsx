import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./screens/rootlayout"
import HomePage from "./screens/homepage"
import { AnimePage } from "./screens/animepage"
import { LoginPage } from "./screens/loginpage"
import { AdminPage, Loader as AdminLoader } from "./screens/adminpage"
import { RecoilRoot } from "recoil"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "anime/:articleTitle",
        element: <AnimePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "Admin",
        element: <AdminPage />,
        loader: AdminLoader
      }
    ]
  }
])
function App() {
  return (<RecoilRoot><RouterProvider router={router} /></RecoilRoot>)

}

export default App

