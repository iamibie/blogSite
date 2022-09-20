import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from './actions'
import { useNavigate, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'


const LoginScreen = ({history}) => {
    const [email, setEmail] = useState("")
    const [passsword,setPassword] = useState("")

    const dispatch = useDispatch()

    
    const location = useLocation()
    const navigate = useNavigate()

    const login = useSelector(state=> state.login)
    const {loginData} = login

   
    const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    
      if(loginData){
          navigate(redirect)
          
      }

  }, [navigate, loginData, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginAction(email, passsword))
        e.target.reset()
    }


    return (
        <>
         <div className="logo-div"></div>
         <Nav/>
        <div className="login-screen">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                type="email" 
                placeholder="Email"/>
                <input 
                
                value={passsword}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                placeholder="Password"/>
                <button type="submit">Submit</button>
            </form>

        </div>
        <Footer/> 
            
        </>
    )
}

export default LoginScreen
