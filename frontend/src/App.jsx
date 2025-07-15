import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import {Routes, Route, Navigate} from "react-router-dom"

import { Navbar } from "./components";
import { HomePage, SignUpPage, LoginPage, SettingsPage, ProfilePage } from "./pages";

import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import {useThemeStore} from "./store/useThemeStore"


const App = () => {

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()

  console.log({onlineUsers});
  

  // const navigate = useNavigate()
  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  ) 
  
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> :  <Navigate to={"/"} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser? <ProfilePage />: <Navigate to={"/login"} />} />

      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
