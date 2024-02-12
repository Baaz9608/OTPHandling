import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

const OtpInput = ({length = 4, onOtpSubmit = ()=>{ }}) => {

    const [Otp, setOtp] = useState(new Array(length).fill(""))
    const inputRefs = useRef([])
    console.log(Otp, inputRefs)

    useEffect(()=>{
      if(inputRefs.current[0]){
        inputRefs.current[0].focus()
      }
    },[])
    

    const handleChange = (index, event)=>{
      const value = event.target.value
      if(isNaN(value)) return
      console.log('vlaue == ', value)

      const newOtp = [...Otp]
      console.log('otp = ',Otp)

      // allowing only one input
      newOtp[index] = value.substring(value.length-1)
      setOtp(newOtp)
      console.log('newOtp = ',newOtp)

      // submit triggering
      const combinedOtp = newOtp.join("")
      if(combinedOtp.length === length) onOtpSubmit(combinedOtp)

      // moving to next input field if current field is filled

      if(value && index<length-1){
        inputRefs.current[index+1].focus()
      }
    }
    const handleClick = (index)=>{
      inputRefs.current[index].setSelectionRange(1,1)

      // optional
      if(index>0 && !Otp[index-1]){
        inputRefs.current[Otp.indexOf("")].focus()
      }
    }
    const handleKeyDown = (index, event) => {
      if(event.key === 'Backspace' 
        && !Otp[index]
        && index>0
      ){
        // Move focus to the previous on the press of backspace
        inputRefs.current[index-1].focus()
      }
    }


  return (
    <div>
      {
        Otp.map((value, index) => {
          return(
            <input
            key={index}
            type='text'
            value={value}
            ref={(input)=>inputRefs.current[index] = input}
            onChange={(event)=>handleChange(index, event)}
            onClick={() => handleClick(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className='otpInput'
            />
          )
        })
      }
    </div>
  )
}

export default OtpInput
