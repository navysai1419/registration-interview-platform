import React, { useState, useEffect } from 'react';
import side from '../src/assets/side.png';
import laura from '../src/assets/techlogo.png';
import Secur from '../src/assets/cmplogo.png';

import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaGraduationCap, FaCertificate, FaCalendarAlt, FaHeart, FaMapMarkerAlt, FaBuilding, FaUniversity, FaKey, FaCheckCircle, FaExclamationTriangle, FaUserPlus, FaCheck, FaTimes } from 'react-icons/fa';

const RegistrationPage = () => {
  const [step, setStep] = useState(1); // 1: registration form, 2: OTP verification, 3: success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    educational_status: '',
    qualification: '',
    passedout_year: '',
    interest: '',
    state: '',
    city: '',
    college_name: ''
  });
  const [colleges, setColleges] = useState([]);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const qualifications = [
    "B.Tech",
    "B.E",
    "B.Sc",
    "B.Com",
    "B.A",
    "BBA",
    "BA LLB",
    "BCA",
    "MBBS",
    "BDS",
    "B.Pharm",
    "B.Des",
    "BFA",
    "BHM",
    "M.Tech",
    "M.E",
    "M.Sc",
    "M.Com",
    "M.A",
    "MBA",
    "LLM",
    "MCA",
    "MD",
    "MS",
    "MFA",
    "PhD"
  ];

  useEffect(() => {
    fetch('https://api.devtalent.securxperts.com:8000/admin/colleges')
      .then(res => res.json())
      .then(data => setColleges(data))
      .catch(err => console.error(err));
  }, []);

  const validateField = (name) => {
    let newError = '';

    switch (name) {
      case 'name':
        if (!formData.name.trim()) {
          newError = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
          newError = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
          newError = 'Name can only contain letters and spaces';
        }
        break;
      case 'email':
        if (!formData.email.trim()) {
          newError = 'Email is required';
        } else if (!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())) {
          newError = 'Email must be a valid Gmail address';
        }
        break;
      case 'phone':
        if (!formData.phone) {
          newError = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
          newError = 'Phone number must be exactly 10 digits';
        }
        break;
      case 'country':
        if (!formData.country.trim()) {
          newError = 'Country is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.country.trim())) {
          newError = 'Country can only contain letters and spaces';
        }
        break;
      case 'educational_status':
        if (!formData.educational_status.trim()) {
          newError = 'Educational status is required';
        } else if (formData.educational_status.trim().length < 2) {
          newError = 'Educational status must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.educational_status.trim())) {
          newError = 'Educational status can only contain letters and spaces';
        }
        break;
      case 'qualification':
        if (!formData.qualification) {
          newError = 'Qualification is required';
        }
        break;
      case 'passedout_year':
        if (!formData.passedout_year) {
          newError = 'Passed out year is required';
        } else if (!/^\d{4}$/.test(formData.passedout_year)) {
          newError = 'Year must be exactly 4 digits';
        }
        break;
      case 'interest':
        if (!formData.interest) {
          newError = 'Area of interest is required';
        }
        break;
      case 'state':
        if (!formData.state.trim()) {
          newError = 'State is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.state.trim())) {
          newError = 'State can only contain letters and spaces';
        }
        break;
      case 'city':
        if (!formData.city.trim()) {
          newError = 'City is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.city.trim())) {
          newError = 'City can only contain letters and spaces';
        }
        break;
      case 'college_name':
        if (!formData.college_name) {
          newError = 'College/University is required';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: newError }));
    return !newError;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEducationalStatusChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData(prev => ({ ...prev, educational_status: value }));
    if (errors.educational_status) {
      setErrors(prev => ({ ...prev, educational_status: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setFormData(prev => ({ ...prev, phone: value }));
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setFormData(prev => ({ ...prev, passedout_year: value }));
      if (errors.passedout_year) {
        setErrors(prev => ({ ...prev, passedout_year: '' }));
      }
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setOtpError('');
    }
  };

  const getFieldStyle = (name, baseStyle, focusStyle) => {
    let style = baseStyle;
    if (focusedField === name) {
      style = { ...focusStyle };
    }
    if (touched[name] && errors[name]) {
      style = {
        ...style,
        borderColor: '#dc3545',
        boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.1)'
      };
    }
    return style;
  };

  const handleFocusField = (name) => {
    setFocusedField(name);
  };

  const handleBlurField = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name);
    setFocusedField(null);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      let fieldError = '';
      // same switch logic as validateField, but set fieldError
      switch (field) {
        case 'name':
          if (!formData.name.trim()) {
            fieldError = 'Full name is required';
          } else if (formData.name.trim().length < 2) {
            fieldError = 'Name must be at least 2 characters long';
          } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            fieldError = 'Name can only contain letters and spaces';
          }
          break;
        case 'email':
          if (!formData.email.trim()) {
            fieldError = 'Email is required';
          } else if (!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())) {
            fieldError = 'Email must be a valid Gmail address';
          }
          break;
        case 'phone':
          if (!formData.phone) {
            fieldError = 'Phone number is required';
          } else if (!/^\d{10}$/.test(formData.phone)) {
            fieldError = 'Phone number must be exactly 10 digits';
          }
          break;
        case 'country':
          if (!formData.country.trim()) {
            fieldError = 'Country is required';
          } else if (!/^[a-zA-Z\s]+$/.test(formData.country.trim())) {
            fieldError = 'Country can only contain letters and spaces';
          }
          break;
        case 'educational_status':
          if (!formData.educational_status.trim()) {
            fieldError = 'Educational status is required';
          } else if (formData.educational_status.trim().length < 2) {
            fieldError = 'Educational status must be at least 2 characters long';
          } else if (!/^[a-zA-Z\s]+$/.test(formData.educational_status.trim())) {
            fieldError = 'Educational status can only contain letters and spaces';
          }
          break;
        case 'qualification':
          if (!formData.qualification) {
            fieldError = 'Qualification is required';
          }
          break;
        case 'passedout_year':
          if (!formData.passedout_year) {
            fieldError = 'Passed out year is required';
          } else if (!/^\d{4}$/.test(formData.passedout_year)) {
            fieldError = 'Year must be exactly 4 digits';
          }
          break;
        case 'interest':
          if (!formData.interest) {
            fieldError = 'Area of interest is required';
          }
          break;
        case 'state':
          if (!formData.state.trim()) {
            fieldError = 'State is required';
          } else if (!/^[a-zA-Z\s]+$/.test(formData.state.trim())) {
            fieldError = 'State can only contain letters and spaces';
          }
          break;
        case 'city':
          if (!formData.city.trim()) {
            fieldError = 'City is required';
          } else if (!/^[a-zA-Z\s]+$/.test(formData.city.trim())) {
            fieldError = 'City can only contain letters and spaces';
          }
          break;
        case 'college_name':
          if (!formData.college_name) {
            fieldError = 'College/University is required';
          }
          break;
      }
      if (fieldError) {
        newErrors[field] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (!isValid) {
      const errorFields = Object.keys(newErrors);
      setTouched(prev => ({
        ...prev,
        ...errorFields.reduce((acc, key) => ({ ...acc, [key]: true }), {})
      }));
    }
    return isValid;
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      educational_status: '',
      qualification: '',
      passedout_year: '',
      interest: '',
      state: '',
      city: '',
      college_name: ''
    });
    setOtp('');
    setError('');
    setOtpError('');
    setErrors({});
    setTouched({});
    setFocusedField(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.devtalent.securxperts.com:8000/auth/register/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(2);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpError('');

    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setOtpError('OTP must be exactly 6 digits');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.devtalent.securxperts.com:8000/auth/register/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp_code: otp
        }),
      });

      if (response.ok) {
        setStep(3);
        // Redirect after 5 seconds
        setTimeout(() => {
          window.location.href = 'https://lauratek.in/';
        }, 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
    width: '100vw',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: '0',
    width: '100%',
    maxWidth: 'none',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    gap: '0',
    height: 'auto',
    minHeight: '80vh'
  };

  const cardBeforeStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #007bff, #4dabf7)'
  };

  const leftPanelStyle = {
    flex: '0 0 35%',
    backgroundImage: `url(${side})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    position: 'relative',
    zIndex: 1
  };

  const leftTitleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '60px 0 10px 0',
    color: 'black',
    transition: 'opacity 0.5s ease-in-out'
  };

  const leftSubtitleStyle = {
    fontSize: '16px',
    color: 'black',
    margin: '0 0 40px 0',
    fontWeight: '500',
    transition: 'opacity 0.5s ease-in-out'
  };

  const rightPanelStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  };

  const rightHeaderStyle = {
    marginBottom: '10px',
    color: '#333'
  };

  const rightTitleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const sectionStyle = {
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#1e3a8a',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const formGroupStyle = {
    marginBottom: '15px',
    position: 'relative'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
    gap: '8px'
  };

  const iconStyle = {
    color: '#007bff',
    fontSize: '16px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.2s',
    backgroundColor: '#fafbff',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#007bff',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
    backgroundColor: 'white'
  };

  const selectStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.2s',
    backgroundColor: '#fafbff',
    boxSizing: 'border-box',
    backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
    backgroundPosition: 'right 12px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    appearance: 'none'
  };

  const selectFocusStyle = {
    ...selectStyle,
    borderColor: '#007bff',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
    backgroundColor: 'white'
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const fieldErrorStyle = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '5px',
    paddingLeft: '40px'
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '20px'
  };

  const submitButtonStyle = {
    flex: 1,
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #007bff 0%, #4dabf7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const submitButtonDisabledStyle = {
    ...submitButtonStyle,
    background: '#6c757d',
    cursor: 'not-allowed',
    opacity: 0.7,
    boxShadow: 'none'
  };

  const resetButtonStyle = {
    flex: 1,
    padding: '14px 24px',
    background: 'transparent',
    color: '#007bff',
    border: '2px solid #007bff',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const otpTextStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#666',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const successStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
    gap: '20px'
  };

  const successIconStyle = {
    fontSize: '60px',
    color: '#007bff'
  };

  const rowStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px'
  };

  const columnStyle = {
    flex: 1,
    paddingBottom: '20px',
    borderBottom: '1px solid #eee'
  };

  const headerInnerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const getInputIcon = (name) => {
    switch (name) {
      case 'name': return <FaUser />;
      case 'email': return <FaEnvelope />;
      case 'phone': return <FaPhone />;
      case 'country': return <FaGlobe />;
      case 'educational_status': return <FaGraduationCap />;
      case 'qualification': return <FaCertificate />;
      case 'passedout_year': return <FaCalendarAlt />;
      case 'interest': return <FaHeart />;
      case 'state': return <FaMapMarkerAlt />;
      case 'city': return <FaBuilding />;
      case 'college_name': return <FaUniversity />;
      default: return null;
    }
  };

  const getOtpStyle = () => {
    let style = inputStyle;
    if (focusedField === 'otp') {
      style = { ...inputFocusStyle };
    }
    if (otpError) {
      style = {
        ...style,
        borderColor: '#dc3545',
        boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.1)'
      };
    }
    return style;
  };

  const handleOtpBlur = () => {
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setOtpError('OTP must be exactly 6 digits');
    } else {
      setOtpError('');
    }
    setFocusedField(null);
  };

  return (
    <div style={containerStyle}>
      {step === 3 ? (
        <div style={successStyle}>
          <FaCheckCircle style={successIconStyle} />
          Registered successfully!
        </div>
      ) : (
        <div style={cardStyle}>
          <div style={cardBeforeStyle}></div>
          <div style={leftPanelStyle}>
            <img 
              src={Secur} 
              alt="SecurXperts" 
              style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '20px', 
                width: '140px' 
              }} 
            />
            {/* <img 
              src={laura} 
              alt="LauraTek" 
              style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                width: '80px' 
              }} 
            /> */}
            {step === 1 ? (
              <>
                <h2 style={leftTitleStyle}>REGISTER NOW</h2>
                <p style={leftSubtitleStyle}>Create your account to get started with exams 🎓✨</p>
              </>
            ) : (
              <>
                <h2 style={leftTitleStyle}>VERIFY EMAIL</h2>
                <p style={leftSubtitleStyle}>Confirm your account</p>
              </>
            )}
          </div>
          {step === 1 ? (
            <div style={rightPanelStyle}>

              {error && (
                <div style={errorStyle}>
                  <FaExclamationTriangle style={iconStyle} />
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} style={{ flex: 1 }}>
                {/* Personal and Educational Row */}
                <div style={rowStyle}>
                  {/* Personal Information Column */}
                  <div style={{ ...sectionStyle, ...columnStyle }}>
                    <h3 style={sectionTitleStyle}>
                      Personal Information
                    </h3>
                    <div style={formGroupStyle}>
                      <label htmlFor="name" style={labelStyle}>
                        {getInputIcon('name')}
                        Full Name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name 😊"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocusField('name')}
                        onBlur={() => handleBlurField('name')}
                        required
                        style={getFieldStyle('name', inputStyle, inputFocusStyle)}
                      />
                      {errors.name && <div style={fieldErrorStyle}>{errors.name}</div>}
                    </div>
                    <div style={formGroupStyle}>
                      <label htmlFor="email" style={labelStyle}>
                        {getInputIcon('email')}
                        Email Address <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email 📧"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocusField('email')}
                        onBlur={() => handleBlurField('email')}
                        required
                        style={getFieldStyle('email', inputStyle, inputFocusStyle)}
                      />
                      {errors.email && <div style={fieldErrorStyle}>{errors.email}</div>}
                    </div>
                    <div style={formGroupStyle}>
                      <label htmlFor="phone" style={labelStyle}>
                        {getInputIcon('phone')}
                        Phone Number <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number 📱"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onFocus={() => handleFocusField('phone')}
                        onBlur={() => handleBlurField('phone')}
                        required
                        style={getFieldStyle('phone', inputStyle, inputFocusStyle)}
                      />
                      {errors.phone && <div style={fieldErrorStyle}>{errors.phone}</div>}
                    </div>
                    <div style={formGroupStyle}>
                      <label htmlFor="country" style={labelStyle}>
                        {getInputIcon('country')}
                        Country <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="country"
                        type="text"
                        name="country"
                        placeholder="Enter your country 🌍"
                        value={formData.country}
                        onChange={handleInputChange}
                        onFocus={() => handleFocusField('country')}
                        onBlur={() => handleBlurField('country')}
                        required
                        style={getFieldStyle('country', inputStyle, inputFocusStyle)}
                      />
                      {errors.country && <div style={fieldErrorStyle}>{errors.country}</div>}
                    </div>
                  </div>

                  {/* Educational Background Column */}
                  <div style={{ ...sectionStyle, ...columnStyle }}>
                    <h3 style={sectionTitleStyle}>
                      Educational Background
                    </h3>
                    <div style={formGroupStyle}>
                      <label htmlFor="educational_status" style={labelStyle}>
                        {getInputIcon('educational_status')}
                        Educational Status <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="educational_status"
                        type="text"
                        name="educational_status"
                        placeholder="e.g., Pursuing,Graduate, Post Graduate 🎓"
                        value={formData.educational_status}
                        onChange={handleEducationalStatusChange}
                        onFocus={() => handleFocusField('educational_status')}
                        onBlur={() => handleBlurField('educational_status')}
                        required
                        style={getFieldStyle('educational_status', inputStyle, inputFocusStyle)}
                      />
                      {errors.educational_status && <div style={fieldErrorStyle}>{errors.educational_status}</div>}
                    </div>
                    <div style={formGroupStyle}>
                      <label htmlFor="qualification" style={labelStyle}>
                        {getInputIcon('qualification')}
                        Qualification <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        onFocus={() => handleFocusField('qualification')}
                        onBlur={() => handleBlurField('qualification')}
                        required
                        style={getFieldStyle('qualification', selectStyle, selectFocusStyle)}
                      >
                        <option value="">Select Qualification</option>
                        {qualifications.map(qual => (
                          <option key={qual} value={qual}>{qual}</option>
                        ))}
                      </select>
                      {errors.qualification && <div style={fieldErrorStyle}>{errors.qualification}</div>}
                    </div>
                    <div style={formGroupStyle}>
                      <label htmlFor="passedout_year" style={labelStyle}>
                        {getInputIcon('passedout_year')}
                        Passed Out Year <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="passedout_year"
                        type="text"
                        name="passedout_year"
                        placeholder="e.g., 2026 📅"
                        value={formData.passedout_year}
                        onChange={handleYearChange}
                        onFocus={() => handleFocusField('passedout_year')}
                        onBlur={() => handleBlurField('passedout_year')}
                        required
                        style={getFieldStyle('passedout_year', inputStyle, inputFocusStyle)}
                      />
                      {errors.passedout_year && <div style={fieldErrorStyle}>{errors.passedout_year}</div>}
                    </div>
                    <div style={formGroupStyle}>
                      <label htmlFor="college_name" style={labelStyle}>
                        {getInputIcon('college_name')}
                        College/University Name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select
                        id="college_name"
                        name="college_name"
                        value={formData.college_name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocusField('college_name')}
                        onBlur={() => handleBlurField('college_name')}
                        required
                        style={getFieldStyle('college_name', selectStyle, selectFocusStyle)}
                      >
                        <option value="">Select College</option>
                        {colleges.map(college => (
                          <option key={college.id} value={college.name}>{college.name}</option>
                        ))}
                      </select>
                      {errors.college_name && <div style={fieldErrorStyle}>{errors.college_name}</div>}
                    </div>
                  </div>
                </div>

                {/* Location and Interest Section */}
                <div style={sectionStyle}>
                  <h3 style={sectionTitleStyle}>
                    Location & Interests
                  </h3>
                  <div style={rowStyle}>
                    <div style={columnStyle}>
                      <div style={formGroupStyle}>
                        <label htmlFor="state" style={labelStyle}>
                          {getInputIcon('state')}
                          State <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          id="state"
                          type="text"
                          name="state"
                          placeholder="Enter your state 🗺️"
                          value={formData.state}
                          onChange={handleInputChange}
                          onFocus={() => handleFocusField('state')}
                          onBlur={() => handleBlurField('state')}
                          required
                          style={getFieldStyle('state', inputStyle, inputFocusStyle)}
                        />
                        {errors.state && <div style={fieldErrorStyle}>{errors.state}</div>}
                      </div>
                    </div>
                    <div style={columnStyle}>
                      <div style={formGroupStyle}>
                        <label htmlFor="city" style={labelStyle}>
                          {getInputIcon('city')}
                          City <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          placeholder="Enter your city 🏙️"
                          value={formData.city}
                          onChange={handleInputChange}
                          onFocus={() => handleFocusField('city')}
                          onBlur={() => handleBlurField('city')}
                          required
                          style={getFieldStyle('city', inputStyle, inputFocusStyle)}
                        />
                        {errors.city && <div style={fieldErrorStyle}>{errors.city}</div>}
                      </div>
                    </div>
                    <div style={columnStyle}>
                      <div style={formGroupStyle}>
                        <label htmlFor="interest" style={labelStyle}>
                          {getInputIcon('interest')}
                          Area of Interest <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          onFocus={() => handleFocusField('interest')}
                          onBlur={() => handleBlurField('interest')}
                          required
                          style={getFieldStyle('interest', selectStyle, selectFocusStyle)}
                        >
                          <option value="">Select Area of Interest</option>
                          <option value="Python">Python</option>
                          <option value="Java">Java</option>
                          <option value="AI/ML">AI/ML</option>
                          <option value="UI/UX">UI/UX</option>
                          <option value="Node JS">Node JS</option>
                          <option value="React JS">React JS</option>
                          <option value="Cloud + DevOps">Cloud + DevOps</option>
                          <option value="SQL / NO SQL">SQL / NO SQL</option>
                        </select>
                        {errors.interest && <div style={fieldErrorStyle}>{errors.interest}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={buttonsContainerStyle}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={loading ? submitButtonDisabledStyle : submitButtonStyle}
                    onMouseEnter={(e) => !loading && Object.assign(e.target.style, { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0, 123, 255, 0.4)' })}
                    onMouseLeave={(e) => !loading && Object.assign(e.target.style, { transform: 'translateY(0)', boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)' })}
                  >
                    {loading ? 'Registering...' : 'REGISTER'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={resetButtonStyle}
                    onMouseEnter={(e) => Object.assign(e.target.style, { backgroundColor: '#007bff', color: 'white', transform: 'translateY(-2px)' })}
                    onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent', color: '#007bff', transform: 'translateY(0)' })}
                  >
                    RESET
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={rightPanelStyle}>
              <div style={rightHeaderStyle}>
                <div style={headerInnerStyle}>
                  <h1 style={rightTitleStyle}>
                    <FaKey style={{ fontSize: '24px' }} />
                    Verify Your Email
                  </h1>
                  <FaTimes
                    style={{ cursor: 'pointer', fontSize: '24px', color: '#666' }}
                    onClick={() => window.close()}
                  />
                </div>
              </div>

              {error && (
                <div style={errorStyle}>
                  <FaExclamationTriangle style={iconStyle} />
                  {error}
                </div>
              )}

              <form onSubmit={handleVerify} style={{ flex: 1 }}>
                <div style={otpTextStyle}>
                  <FaEnvelope style={iconStyle} />
                  Please enter the OTP sent to <strong>{formData.email}</strong>
                </div>
                <div style={formGroupStyle}>
                  <label htmlFor="otp" style={labelStyle}>
                    <FaKey style={iconStyle} />
                    OTP Code <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP 🔑"
                    value={otp}
                    onChange={handleOtpChange}
                    onFocus={() => handleFocusField('otp')}
                    onBlur={handleOtpBlur}
                    required
                    maxLength={6}
                    style={getOtpStyle()}
                  />
                  {otpError && <div style={fieldErrorStyle}>{otpError}</div>}
                </div>
                <div style={buttonsContainerStyle}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={loading ? submitButtonDisabledStyle : submitButtonStyle}
                    onMouseEnter={(e) => !loading && Object.assign(e.target.style, { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0, 123, 255, 0.4)' })}
                    onMouseLeave={(e) => !loading && Object.assign(e.target.style, { transform: 'translateY(0)', boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)' })}
                  >
                    {loading ? 'Verifying...' : 'SUBMIT'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={resetButtonStyle}
                    onMouseEnter={(e) => Object.assign(e.target.style, { backgroundColor: '#007bff', color: 'white', transform: 'translateY(-2px)' })}
                    onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent', color: '#007bff', transform: 'translateY(0)' })}
                  >
                    RESET
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;