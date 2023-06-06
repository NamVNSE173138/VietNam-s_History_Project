import React from 'react'
import logo from "../assets/image/logo-color.png"
import { Link } from 'react-router-dom'
export default function Header(){
    
        return(
            <div className='header'>
                <div className='logo'>
                    <img src={logo} />
                    <nav>
                    <ul>
                    <li><Link to={"/"} className='active' href='#Home'>HOME</Link></li>
                    <li><Link to={"/events"} >EVENT</Link></li>
                    <li><Link to={"/posts"} >POST</Link></li>
                    <li><Link to={"/grade"} >GRADE</Link></li>
                    </ul>
                </nav>
                </div>
                
                <nav className='login'>
                    <ul>
                    <li><Link to={"/login"} >LOGIN</Link></li>
                    <li><Link to={"/signup"} >SIGN UP</Link></li>
                    </ul>
                </nav>
            </div>
        )
        
    
}