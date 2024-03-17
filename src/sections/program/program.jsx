import { Link } from "react-router-dom";

import {ProgressBar} from "./progressBar";

export default function Program(value){
    return(
            <div className="flex flex-wrap justify-evenly gap-3">
                 <div className="border-2 rounded-t-3xl max-w-60 mb-4 md:w-full">
                    <a href={`detail/${2}`}>
                        <img src="/assets/images/Masjid/Masjid1.png" alt="s" className="border-b-2 rounded-3xl w-full max-h-40 object-cover object-center" />
                        <p className="px-3 py-1 bg-[#075987] w-2/3 rounded-xl text-[#fff] mx-auto my-3 text-center">Pembangunan</p>
                        <p className="w-3/4 text-sm ms-3 text-[#075987]">Pengembangan Masjid AL HUDA</p>
                        <p className="w-3/4 text-sm ms-3 my-3 text-[#075987] font-bold">Perolehan :</p>
                        <p className="text-sm text-center text-[#075987]">Rp 15.000.000</p>
                        <ProgressBar values={{ terkini: 15000000, target: 19000000 }}/>
                        <div className="py-1 px-3 bg-[#e8eaec] flex justify-between">
                        <p className="text-sm text-[#075987]"> Target</p>
                        <p className="text-sm text-[#075987]"> Rp 19.000.000</p>
                        </div>
                        <Link to="donasi" className="py-1 bg-[#075987] block text-[#fff] text-center">
                        Donasi
                        </Link>
                    </a>
                </div>  
            </div>
    )
}