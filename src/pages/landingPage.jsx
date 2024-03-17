/* eslint-disable import/no-extraneous-dependencies */
import { Helmet } from 'react-helmet-async';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

/* eslint-disable react/self-closing-comp */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Program from 'src/sections/program/program';
import Carousell from "src/sections/component/carousell";

export default function LandingPage(){
    return(
        <>
            <Helmet>
                <title>Landing Page</title>
            </Helmet>
            <Carousell/>
            <div className="flex justify-center mt-5">
                <button type="button" className="w-2/3">
                <div className="p-4 text-center w-full rounded-xl" style={{ backgroundColor: "#075987" }}>
                    <p className="text-white font-bold font-aleo lg:text-xl">PROJEK DONASI</p>
                </div>
                <KeyboardArrowDownIcon sx={{ fontSize:80,color: "#075987" }}/>
                </button>
            </div>
            <Program/>
            <a href="#" className='border-2 py-2 justify-center gap-2 items-center w-1/4 flex mx-auto my-6 rounded-xl border-[#075987] text-[#075987]'>
                Lihat Semua
                <ArrowRightIcon className='w-1/12'/>
            </a>
        </>
    )
} 