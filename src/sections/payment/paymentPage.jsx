/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";

import {Radio, Select, MenuItem, InputLabel, RadioGroup, Typography, FormControl, OutlinedInput, InputAdornment, FormHelperText, FormControlLabel } from "@mui/material";


export default function PaymentPage({ formik }){
    // const {userInfo} = useAuthContext()
    const location = useLocation();
    const formDataFromDetailProgram = location.state || 0;
    const images = [
        {url:'/assets/images/payments/BCA.png',name:'BCA',type:'Bank',noRek:'0000000'},
        {url:'/assets/images/payments/Mandiri.png',name:'Mandiri',type:'Bank',noRek:'0000000'},
        {url:'/assets/images/payments/Dana.png',name:'Dana',type:'eWallet',noRek:'0000000'},
        {url:'/assets/images/payments/GoPay.png',name:'GoPay',type:'eWallet',noRek:'0000000'},
      ];
    return (
        <>
            <div className="border-[#045B86] border bg-[#0e9fd81b] w-5/6 mx-auto mt-10 rounded-lg p-10">
                    <p className="text-sm font-bold">Nominal Sumbangan :  </p>
                            <FormControl focused fullWidth color="primary" sx={{ mt:2 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Donasi</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">IDR</InputAdornment>}
                                    label="Amount"
                                    name="nominal"
                                    defaultValue={formDataFromDetailProgram}
                                    value={formik.values.nominal}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nominal && Boolean(formik.errors.nominal)}
                                    helperText={formik.touched.nominal && formik.errors.nominal}
                                />
                                <FormHelperText sx={{ color:"#f44336" }}> 
                                    {formik.touched.nominal && formik.errors.nominal}
                                </FormHelperText>
                            </FormControl>
                    <p className="text-sm font-bold mt-3">Metode Pembayaran : </p>
                            <FormControl fullWidth sx={{backgroundColor:'#FFD35B',my:1,borderRadius:1 }}>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                name="metode"
                                value={formik.values.metode}
                                onChange={formik.handleChange}
                                error={formik.touched.metode && Boolean(formik.errors.metode)}
                                >
                                {images.map((image,i) => (
                                    <MenuItem
                                    key={i}
                                    value={image.name}
                                    sx={{backgroundColor:'#FFD35B',borderColor:'045B86'}}
                                    >
                                    <img src={image.url} alt="" className="max-h-10 mx-auto" />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                                <Typography sx={{ color:"#f44336", fontSize:12, marginLeft:2 }}> 
                                    {formik.touched.metode && formik.errors.metode}
                                </Typography>
            </div>
            <div className="border-[#045B86] border bg-[#0e9fd81b] w-5/6 mx-auto rounded-lg p-10 mt-5">
                <p className="text-sm mb-5">
                    Lengkapi Data Berikut Untuk Berdonasi, Kemudian Klik Lanjut Pembayaran Pilih Donasi Dan Metode Pembayaran
                </p>
                <div className="w-full md:w-2/3">
                    <p className="text-sm font-bold mt-3">Pahala Dihadiahkan, Atas Nama :</p>
                    <FormControl focused fullWidth color="primary" sx={{ mt:1 }}>
                            <OutlinedInput
                                name="namaHibah"
                                value={formik.values.namaHibah}
                                onChange={formik.handleChange}
                                error={formik.touched.namaHibah && Boolean(formik.errors.namaHibah)}
                                helperText={formik.touched.namaHibah && formik.errors.namaHibah}
                            />
                            <FormHelperText sx={{ color:"#f44336" }}> 
                                {formik.touched.namaHibah && formik.errors.namaHibah}
                            </FormHelperText>
                    </FormControl>
                    <p className="text-sm font-bold mt-3">Munculkan Donasi Sebagai : </p>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={formik.handleChange}
                            defaultValue
                        >
                            <FormControlLabel  control={<Radio name="reveal" value/>} label="Gunakan nama pendaftaran"/>
                            <FormControlLabel  control={<Radio name="reveal" value={false}/>} label="Hamba Allah"/>
                        </RadioGroup>
                    </FormControl>
                    <p className="text-sm font-bold mt-3">Pesan dan Dukungan : </p>
                    <FormControl focused fullWidth color="primary" sx={{ mt:1 }}>
                            <OutlinedInput
                                name="pesan"
                                value={formik.values.pesan}
                                onChange={formik.handleChange}
                            />
                    </FormControl>
                </div>
                
            </div>
        </>
    )
}