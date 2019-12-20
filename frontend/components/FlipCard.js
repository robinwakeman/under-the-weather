import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import '~/css/flip.css'

export default function FlipCard(props) {

  const { transform, opacity } = useSpring({
    // 180 flip
    //transform: `perspective(600px) scaleX(${props.flipped ? -1: 1 }) rotateY(${props.flipped ? 180 : 0}deg)`,
    //config: { mass: 1, tension: 500, friction: 80 }
    // 360 flip
    transform: `perspective(600px) rotateY(${props.flipped ? 360 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 80 }
  })

  return (
    <div>
      <animated.div class="flip" style={{transform }}>
          {props.flipped ? props.back: props.front}
      </animated.div>
    </div>
  )
}

