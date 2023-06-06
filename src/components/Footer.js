import React from "react"
import { Link } from "react-router-dom"
export default function Footer(){
    return(
        <div className="footer">
            <h5>Copyright © <Link to={'/'}>Cun</Link></h5>
        </div>
    )
}