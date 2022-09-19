import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logoutAction } from './actions'
import { Link } from 'react-router-dom'

const Nav = () => {
    const [showMenu, setShowMenu] = useState(false)

    const login = useSelector(state => state.login)
    const{userInfo} = login

    const dispatch = useDispatch()


    const logoutHandler = () => {
        dispatch(logoutAction())
    }

    let menuItems

    if(showMenu){
        menuItems = 
        <div style={{position:"absolute", top:"15%", right:"3%", display:"flex" ,flexDirection:"row"}} className="menu-items">
            {userInfo ? <div style={{margin:"10px"}}> <a style={{marginRight:"10px"}} href="/profile">Profile</a> <a style={{marginLeft:"0"}} href="#" onClick={logoutHandler}>Logout</a> </div> : <Link to='/login'>Login</Link>}
            {userInfo && userInfo.isAdmin && <a style={{margin:"5px"}} href='/create/article'>createPost</a>}
        </div>

    }

    
    return (
        <div className="main-nav">


        <div id="nav" className="navBar">
            <Link to='/'>Home</Link>  
             <a href="https://www.ibrahimmahamane.com/#about-section">About</a>
             <a href="https://www.ibrahimmahamane.com">Portfolio</a>
             <div style={{backgroundColor:"#cf5c36ff", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"5px"}}><img src='/img/arrow.png' width="35rem" style={{cursor:"pointer"}}  onClick={()=>setShowMenu(!showMenu)}/></div>
             {menuItems} 
        </div>

        </div>
    )
}

export default Nav
