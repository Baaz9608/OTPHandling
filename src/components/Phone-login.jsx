import React, { useState } from "react";
import OtpInput from "./otp-Input";

const PhoneOtpForm = () => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [ShowOtpInput, setShowOtpInput] = useState(false);

  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const phoneSubmitHandler = (event) => {
    event.preventDefault();
    const regex = /[^0-9]/g;

    // phone Number validation
    if (PhoneNumber < 10 || regex.test(PhoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // backend api

    // show otp field
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) =>{
    console.log("Login successfully", otp)
  }

  return (
    <div>
      {
        !ShowOtpInput?
        <form onSubmit={phoneSubmitHandler}>
          <input
            type="number"
            value={PhoneNumber}
            onChange={phoneNumberHandler}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
        :<div>
          <p>Enter OTP sent to {PhoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
      }
    </div>
  );
};

export default PhoneOtpForm;
