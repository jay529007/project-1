import React from 'react'
import Hero from './Hero'
import Homecards from './homecards/Homecard'
import { Joblisting } from './joblisting/joblisting'
import ViewAllJobs from './viewAllJobs'
// import Joblisting from './joblisting/joblisting'


export const Home = () => {
  return (
    <>
    <Hero/>
    <Homecards/>
    <Joblisting isHome={true}/>
    <ViewAllJobs/>
    </>
  )
}
