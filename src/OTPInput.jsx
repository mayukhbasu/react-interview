import React, { useState, useRef } from 'react';

const OTPInput = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const inputRefs = useRef([]);

  // Handle change and automatically move to the next input
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Move to the previous input on Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={styles.container}>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={styles.input}
        />
      ))}
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Centers the container vertically
    gap: '10px',
  },
  input: {
    width: '40px',
    height: '40px',
    fontSize: '20px',
    textAlign: 'center',
  },
};

export default OTPInput;
