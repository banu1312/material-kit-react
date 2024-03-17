/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { toast } from 'sonner';
import { useFormik } from 'formik';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { paymentValidationSchema, konfirmasiValidationSchema } from 'src/utils/validationSchema';

import AuthContext from 'src/api/authContext';
import { create, update } from 'src/api/payment';

import PaymentPage from './paymentPage';
import KonfirmasiPage from './konfirmasiPage';

const steps = ['Pendataan', 'Konfirmasi', 'Finish'];

export default function PaymentStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const {userInfo}= useContext(AuthContext)
  const [data,setData] = useState({})
  const navigate = useNavigate()
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };
  const formik = useFormik({
    initialValues:{
      namaHibah:'',
      nominal: 0,
      metode: '',
      reveal: true,
      user_id: userInfo.id,
      pesan: '',
      file: null,
    },
    validationSchema: activeStep === 0 ? paymentValidationSchema : activeStep === 1 && konfirmasiValidationSchema,
    onSubmit:(v)=>{
      handleNext(v)
    }
  })
  const handleNext = (v) => {
    if(activeStep === 0){
      create({v}).then((res)=>{
        setData(res.data)
          if(res.error === true){
            toast.error("Failed To Create Data")
          }
          if (!formik.errors || Object.keys(formik.errors).length === 0 && res.error !== true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        })
    }
    else if(activeStep === 1){
      update(v,data.data.id).then((res)=>{
          if(res.error === true){
            toast.error("Failed To Create Data")
          }
          if (!formik.errors || Object.keys(formik.errors).length === 0 && res.error !== true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        })
    }
    else{
      navigate('/')
    }
  };
  return (
    <Box sx={{ width: '75%',mt:20,mx:'auto' }}>
        <button type="button" className="w-full mb-10">
            <div className="p-4 text-center w-full rounded-xl" style={{ backgroundColor: "#075987" }}>
                <p className="text-white font-bold font-aleo lg:text-xl">Pembayaran Sumbangan</p>
            </div>
        </button>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 && (
            <PaymentPage formik={formik}/>
          )}
          {activeStep === 1 && (
            <KonfirmasiPage formik={formik} data={data}/>
          )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {/* <Button
                color="inherit"
                disabled
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Kembali
              </Button> */}
              <Box sx={{ flex: '1 1 auto' }} />
              <Button type="submit" >
                {activeStep === steps.length - 1 ? 'Selesai' : 'Selanjutnya'}
              </Button>
            </Box>
        </form>
      )}
    </Box>
  );
}