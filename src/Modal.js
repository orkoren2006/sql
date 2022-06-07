import Button from '@mui/material/Button';
import './Modal.css';

function Modal({closeModal}) {
  return (
    <div className="modal">
      {/* <div className='modalScreen' onClick={closeModal}></div> */}
      <div className='modalContainer'>
        <p><span>Loan amount</span> cannot be lesser than $1,000 and greater than $20,000.</p>
        <p><span>Loan period</span> cannot be lesser than 6 months and greater than 64 months.</p>
        <Button variant="contained" onClick={closeModal}>I understand</Button>
      </div>
    </div>
  );
}

export default Modal;
