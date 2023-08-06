import React from 'react'
import classes from './Hero.module.css'
import manEating from '../../assets/banner1.jpg'

const Hero = () => {
   
  return (
    <>
    <section style={{height: '200vh'}} id="home" className={classes.container}>
      <div className={classes.wrapper}>
    
        <div className={classes.left}>
          <p className={classes.firstMsg}>BlogTastic:  <span>Your Gateway to Inspiring Stories</span></p>
          
          <p className={classes.desc}>
          Discover a world of captivating stories, insightful articles, and thought-provoking blogs. Immerse yourself in the BlogTastic community, where knowledge, creativity, and passions converge. Unleash your imagination, explore diverse perspectives, and be part of an ever-growing platform of avid readers and talented writers. Join us today and embark on an extraordinary journey through the realm of words and ideas.
          </p>
         
        </div>
        <div className={classes.right}>
          <img src={manEating} alt="" className={classes.manEatingImg}/>
        </div>
      </div>
      </section>
  </>
   
  )
}

export default Hero
