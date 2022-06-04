// import * as React from 'react';
import { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import NumericLabel from 'react-pretty-numbers';


export default function SliderAmount() {

  const [value, setValue] = useState(5000)

  useEffect(() => {

  }, [value])

  const handleChange = (ev, newValue) => {
    setValue(parseInt(newValue));
  }

  const insertNumber = (newValue) => {
    setValue(parseInt(newValue));

  }

  return (
    <div className='form'>
      <input type='number' value={value} onChange={e => insertNumber(e.target.value)} />
      <Slider value={value} aria-label="Default" onChange={handleChange} valueLabelDisplay="auto" min={1000} max={20000} color='info' isRtl={true} />
      <div className='numbers flex between'>
        <p>1,000</p>
        <p>20,000</p>
      </div>
    </div>
  ); 
}
