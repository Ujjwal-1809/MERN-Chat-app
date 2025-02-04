import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore'

function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();  
  const { theme } = useThemeStore()

  useEffect(() => {
   checkAuth()
  }, [checkAuth]);
  
  if (isCheckingAuth && !authUser) { // means till the time it is checked whether the user is authenticated or not, the loader should be displayed.
  return <div className='flex justify-center items-center h-screen'>
    <Loader className='size-10 animate-spin'/>
   </div>
  }

  return <div data-theme={theme}>
<Navbar/>
<Routes>

<Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/>}/>
<Route path='/signup' element={!authUser ? <Signup/> : <Navigate to='/'/>}/>
<Route path='/login' element={!authUser ? <Login/> : <Navigate to='/'/>}/>
<Route path='/settings' element={<Settings/>}/>
<Route path='/profile' element={authUser ? <Profile/> : <Navigate to='/login'/>}/>

</Routes>

<Toaster />
  </div>
}

export default App
