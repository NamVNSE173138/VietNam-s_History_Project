import React from 'react'
import Header from '../components/Header'
// import { Slider, Timeline } from 'antd'
import Slider from '../components/Slider'
import Timeline from '../components/Timeline'
import BasicMap from '../components/BasicMap/BasicMap'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Header/>
    <Slider/>
    <BasicMap/>
    <Timeline/>
    <Footer/>
    </>
  )
}

export default Home
