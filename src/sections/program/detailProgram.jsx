/* eslint-disable react/no-unescaped-entities */
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useReducer } from "react";

import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Box, Tab, InputLabel, FormControl, OutlinedInput, InputAdornment } from "@mui/material";

import formattedValue from "src/hooks/formattedValue";

import Imagelist from "./imageList";
import {ProgressBarNonPercent} from "./progressBar";
import { INITIAL_STATE, paymentReducer } from "../payment/paymentReducer";

export default function DetailProgram(){
    // const {id} = useParams()
    const [state,dispatch] = useReducer(paymentReducer,INITIAL_STATE)
    const [value, setValue] = useState('1');
    const parent = useRef(null);
    const aside = useRef(null);
    
    const handleChange = e =>{
        dispatch(
          {type:"CHANGE_INPUT" , payload:{name:e.target.name , value:e.target.value}}
        )
      }
    useEffect(() => {
        if (!aside.current || !parent.current) return;

        aside.current.style.height = `${parent.current.clientHeight}px`;
    }, [parent, aside]);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    return(
            <div  className="container mx-auto pt-16 lg:w-2/3 w-5/6 mt-24">
                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-5">
                    <div ref={parent} className="w-full md:w-2/3">
                        <img src="/assets/images/Masjid/Masjid1.png" alt="s" className="border-b-2 rounded-lg w-full max-h-80 object-cover object-center mb-7" />
                        <h1 className="font-bold text-2xl w-5/6">Pengembangan Masjid AL HUDA  :  Mewujudkan Masjid Sebagai Sarana Ibadah Yang Asri, Nyaman dan Kapasitas Yang Memadai</h1>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTab}>
                                <Tab label="Ringkasan" value="1" />
                                <Tab label="Image List" value="2" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <h3 className="font-bold text-base text-center mb-3">
                                    Pengembangan Masjid AL HUDA  :  Mewujudkan Masjid Sebagai Sarana Ibadah Yang Asri, Nyaman dan Kapasitas Yang Memadai                                
                                </h3>
                                <p className="text-justify tracking-wide leading-relaxed">
                                Dalam rangka peningkatan kapasitas masjid karena sudah tidak mampu menampung jamaah, kami selaku pengurus Masjid Al Huda SMKN 24 Jakarta yang beralamat di Jl. Bambu Hitam, Kelurahan Bambu Apus, Kecamatan Cipayung, Kota Madya Jakarta Timur, Propinsi DKI Jakarta bermaksud mengembangkan MASJID AL HUDA yang terletak di atas lokasi masjid lama.
                                Seiring dengan semakin terbukanya kesadaran beribadah dan bertambahnya jumlah jamaah tetap masjid AL Huda SMKN 24 Jakarta yang diperkirakan lebih kurang 1000 jamaah, maka Pengurus Masjid Al-Huda SMKN 24 Jakarta merasa terpanggil untuk meningkatkan kapasitas masjid. Masjid Al Huda SMKN 24 Jakarta mewadahi kegiatan-kegiatan keislaman terutama Sholat berjamaah, bimbingan rohani islam, kajian-kajian islami yang melibatkan civitas akademika SMKN 24 Jakarta yang jumlahnya mencapai lebih dari 1200 orang , maka telah disepakati bahwa Masjid Al Huda SMKN 24 Jakarta perlu segera diperluas daya tampungnya.
                                Masjid yang kami rencanakan berukuran 11 m x 22 m dengan Anggaran Biaya sebesar Rp.3.540.000.000.,- (tiga milyar lima ratus empat puluh juta rupiah). Dengan ini, kami membuka kesempatan kepada Bapak/ Ibu untuk berperan mengembangkan Masjid Al-Huda dengan cara menyisihkan sebagian rezeki yang telah dititipkan Allah Subhanahu wata'ala.
                                
                                </p>
                            </TabPanel>
                            <TabPanel value="2">
                                <Imagelist/>
                            </TabPanel>
                        </TabContext>
                        </Box>
                    </div>
                    <aside ref={aside} className="md:w-1/3 w-full h-screen">
                        <div className="border rounded-t-lg">
                            <div className="sticky">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="rounded-br-[35px] rounded-tl-lg bg-[#075987] max-w-28 w-full py-4">
                                        <p className="text-[#fff] font-bold text-2xl text-center">
                                            {Math.round((15000000 / 19000000) * 100)}<i>%</i>
                                        </p>
                                    </div>
                                    <p className="me-3 font-bold"> Rp 15.000.000</p>
                                </div>
                               <ProgressBarNonPercent values={{ terkini: 15000000, target: 19000000 }}/>
                               <div className="my-5 mx-3">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs"> Donasi yang diperlukan </p>
                                        <p className="text-sm"> Rp 19.000.000 </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs"> Kekurangan </p>
                                        <p className="text-sm"> - Rp {(19000000 - 15000000).toLocaleString('id', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                            })} 
                                        </p>
                                    </div>
                               </div>
                            </div>
                        </div>
                        <div className="sticky top-[145px] border rounded-b-lg">
                            <div className="py-5 px-3">
                                <p className="text-[#075987] font-bold text-sm py-2">
                                    Mau Donasi Berapa?
                                </p>
                                <div className="flex flex-wrap gap-5 justify-evenly">
                                    <button type="button" className="py-1 px-3 border-2 w-32 rounded-lg text-[#075987] text-sm font-bold" name="nominal" value={100000} onClick={(e)=>handleChange(e)}>
                                        Rp 100.0000
                                    </button>
                                    <button type="button" className="py-1 px-3 border-2 w-32 rounded-lg text-[#075987] text-sm font-bold" name="nominal" value={200000} onClick={(e)=>handleChange(e)}>
                                        Rp 200.000
                                    </button>
                                    <button type="button" className="py-1 px-3 border-2 w-32 rounded-lg text-[#075987] text-sm font-bold" name="nominal" value={300000} onClick={(e)=>handleChange(e)}>
                                        Rp 300.000
                                    </button>
                                    <button type="button" className="py-1 px-3 border-2 w-32 rounded-lg text-[#075987] text-sm font-bold" name="nominal" value={400000} onClick={(e)=>handleChange(e)}>
                                        Rp 400.000
                                    </button>
                                </div>
                                <p className="text-[#075987] font-bold text-sm py-2">
                                    Atau Masukkan Nominal
                                </p>
                                <FormControl fullWidth sx={{ mt:1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Donasi</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">IDR</InputAdornment>}
                                    label="Amount"
                                    name="nominal"
                                    onChange={(e)=>handleChange(e)}
                                />
                                </FormControl>
                            </div>
                            <div className="bg-[#075987] pt-7 pb-3 px-3 text-[#fff] rounded-b-lg">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">
                                        Saya Mau Donasi
                                    </p>
                                    <p className="font-bold md:text-sm xl:text-2xl text-2xl">
                                    Rp {state.formData.nominal === 0 ? 0 : formattedValue(state.formData.nominal)}
                                    </p>
                                </div>
                                <Link
                                    type="button"
                                    to= '/donasi'
                                    state= {state.formData}
                                    className="py-3 px-3 mt-8 border-2 w-full rounded-lg text-[#fff] text-center text-[12] font-bold"
                                >
                                    Donasi Sekarang
                                </Link>
                            </div>
                        </div>
                        
                    </aside>
                </div>
            </div>
    )
}