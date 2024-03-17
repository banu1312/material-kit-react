/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Countdown from 'react-countdown';
import { MuiFileInput } from 'mui-file-input';

import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import {FormControl, FormHelperText }  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function KonfirmasiPage({formik,data}) {
  const [expanded, setExpanded] = React.useState('panel1');
  const createAtTimestamp = Date.parse(data.data.create_at);

  // Menambahkan 1 hari (24 jam) dalam milidetik ke timestamp
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  const jatuhTempoTimestamp = createAtTimestamp + oneDayMilliseconds;
  
  // Mengonversi timestamp menjadi tanggal
  const jatuhTempoDate = new Date(jatuhTempoTimestamp);
  const jatuhTempoString = `${jatuhTempoDate.toLocaleDateString()}, ${jatuhTempoDate.toLocaleTimeString()}`;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return "Waktu Telah Habis";
    }
    return <span>{hours}:{minutes}:{seconds}</span>;
  };
  return (
    <div className='mt-10'>
        <div className="border-[#045B86] border bg-[#0e9fd81b] w-full  my-10 rounded-lg p-5">
            <div className="flex justify-between items-center mb-3 border-b-2 border-[#000]">
                <p className="text-md font-bold">Total Sumbangan :</p>
                <p className="text-md font-bold my-3">Rp {formik.values.nominal}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-md font-bold">Batas Waktu Bayar  :</p>
                <div className="">
                    <p className="text-md font-semibold text-end">
                      <Countdown date={Date.parse(data.data.create_at) + (24*60*60*1000)} renderer={renderer}/>
                    </p>
                    <p className="text-md font-light">Jatuh Tempo {jatuhTempoString}</p>
                </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
            <p className="text-md font-bold">Kirim Bukti Pembayaran :</p>
            <FormControl>
              <MuiFileInput name='file' label="Input Image" value={formik.values.file} 
              onChange={(event) => {
                    formik.setFieldValue('file', event);
                  }} 
                error={formik.touched.file && Boolean(formik.errors.file)}
                />
              <FormHelperText sx={{ color:"#f44336" }}>            
                {formik.touched.file && formik.errors.file}
              </FormHelperText>
            </FormControl>
            </div>

        </div> 
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='subtitle1' sx={{ width: '33%', flexShrink: 0 }}>
            Petunjuk Transfer mBanking
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ul>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>1</p>
                <p>Login pada akun mBanking</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>2</p>
                <p>Pilih fitur Transfer pada mBanking</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>3</p>
                <p>Masukkan noRek <b>0000000000</b> Nominal yang akan ditransfer</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>4</p>
                <p>Masukkan PIN Rekening mBanking untuk proses otorisasi</p>
              </li>
            </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant='subtitle1' sx={{ width: '33%', flexShrink: 0 }}>Petunjuk Transfer iBanking</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ul>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>1</p>
                <p>Login ke Akun iBanking:</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>2</p>
                <p>Pilih fitur Transfer pada mBanking</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>3</p>
                <p>Pilih Rekening Asal:</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>4</p>
                <p>Masukkan noRek <b>0000000000</b> dan Nominal yang akan ditransfer</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>5</p>
                <p>Pilih Jenis Transfer</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>6</p>
                <p>Isi Informasi Tambahan</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>7</p>
                <p>Verifikasi dan Konfirmasi:</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>8  </p>
                <p>Masukkan PIN Rekening mBanking untuk proses otorisasi</p>
              </li>
            </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant='subtitle1' sx={{ width: '33%', flexShrink: 0 }}>
            Petunjuk Transfer ATM
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ul>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>1</p>
                <p>Masukkan Kartu ATM</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>2</p>
                <p>Masukkan PIN</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>3</p>
                <p>Pilih Bahasa</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>4</p>
                <p>Pilih Jenis Transaksi</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>5</p>
                <p>Masukkan noRek <b>0000000000</b> dan Nominal yang akan ditransfer</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>7</p>
                <p>Verifikasi dan Konfirmasi</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>8  </p>
                <p>Konfirmasi Data</p>
              </li>
              <li className='flex gap-2 items-center mb-2'>
                <p className='py-1 px-3 rounded-full bg-[#605d5d] text-[#fff]'>9</p>
                <p>Ambil Struk dan Selesai</p>
              </li>
            </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}