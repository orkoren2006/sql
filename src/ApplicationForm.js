import { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format';

import Modal from './Modal';



export default function ApplicationForm() {

  const maxAmount = (20000).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  const monthlyInterest = 0.02 / 12

  const [application, setApplication] = useState({ amount: 5000, months: 24, monthly: 0 })
  const [monthly, setMonthly] = useState(0)
  const [message, setMessage] = useState(false)
  const [modal, setModal] = useState(false)


  useEffect(() => {
    calculateInstallment()
  }, [application])

  useEffect(() => {
    updateLoan()
  },[monthly])


  const handleSliderAmount = e => {
    let newValue = e.target.value
    setApplication({ ...application, amount: newValue })
    calculateInstallment()
  }

  const handleAmount = e => {
    let number = e.target.value
    if (!number) {
      setApplication({ ...application, amount: null })
    } else {
      let number1 = number.substring(1)
      let number2 = number1.replace(",", "")
      let number3 = parseInt(number2)
      setApplication({ ...application, amount: number3 })
      calculateInstallment()
    }
  }

  const handleSliderMonths = e => {
    let newValue = e.target.value
    setApplication({ ...application, months: newValue })
    calculateInstallment()
  }

  const handleMonths = e => {
    let newValue = e.target.value
    if (!newValue) {
      setApplication({ ...application, months: null })
    } else {
      let number = newValue.replace("Months", "")
      let number2 = parseInt(number)
      setApplication({ ...application, months: number2 })
      calculateInstallment()
    }
  }

  const calculateInstallment = () => {
    if (application.amount > 20000 || application.amount < 1000 || application.months < 6 || application.months > 64) {
      setMonthly(0)
      setMessage(true)
      return
    }
    let monthlyReturn = (application.amount * monthlyInterest * (1 + monthlyInterest) ** application.months) / ((1 + monthlyInterest) ** application.months - 1)
    setMonthly(monthlyReturn)
    setMessage(false)
  }

  const updateLoan = () => {
    setApplication({ ...application, monthly: monthly })
  }

  const apply = () => {
    if (application.amount > 20000 || application.amount < 1000 || application.months < 6 || application.months > 64) {
      setModal(true)
      return
    }

    submitApplication()
  }

  const closeModal = () => {
    setModal(false)
  }

  const submitApplication = async () => {
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...application
      })
    })
    .then(res => res.json())
  }

  return (
    <div>
      {modal&&<Modal closeModal={closeModal}/>}
      <div className='form flex column text'>
        <h2>Loan Calculator</h2>
        <div className='formHeader'>
          <h4>Maximun Funding</h4>
          <h1>{maxAmount}</h1>
        </div>
        <div className='formAmount flex column'>
          <h5>Loan Amount</h5>
          <NumberFormat
            value={application.amount}
            prefix="$ "
            displayType="input"
            type="text"
            thousandSeparator={true}
            onChange={handleAmount}
            placeholder='Insert amount'
          />
          <Slider value={application.amount} aria-label="Default" onChange={handleSliderAmount} valueLabelDisplay="auto" min={1000} max={20000} color='info' isRtl={true} />
          <div className='numbers flex between'>
            <p>{(1000).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <p>{(20000).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </div>
        </div>
        <div className='formMonths'>
          <h5>Loan Period</h5>
          <NumberFormat
            value={application.months}
            suffix=' Months'
            displayType="input"
            type="text"
            onChange={handleMonths}
            placeholder='Insert period'
          />
          <Slider value={application.months} aria-label="Default" onChange={handleSliderMonths} valueLabelDisplay="auto" min={6} max={64} color='info' isRtl={true} />
          <div className='numbers flex between'>
            <p>6 Months</p>
            <p>64 Months</p>
          </div>
        </div>
        <div className='formBottom' >
          <h5>Estimated monthly installments*</h5>
          <h2><NumberFormat value={monthly} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h2>
          <h5>*Based on 2% interest</h5>
          <Button variant="contained" onClick={apply}>Apply Loan</Button>
          <div className={message ? 'message' : 'noMessage'}>
            <h4>Loan amount and period must be within the allowed range!</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
