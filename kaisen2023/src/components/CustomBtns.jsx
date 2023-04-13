import React from 'react'
import { Link } from 'react-router-dom'
import './CustomBtns.scss'

const CustomBtn1 = () => {
    return (
        <Link to="/">
            <button class="custom-btn btn-11">Get Passes<div class="dot"></div></button>
        </Link>
    )
}

const CustomBtn2 = () => {
    return (
        <Link to="/events">
            <button class="custom-btn btn-14">Register for Competitions<div class="dot"></div></button>
        </Link>
    )
}

export { CustomBtn1, CustomBtn2 }