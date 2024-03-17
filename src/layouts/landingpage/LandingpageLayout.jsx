/* eslint-disable react/prop-types */

import Navbar from 'src/sections/component/navbar';

// ----------------------------------------------------------------------

export default function LandingPageLayout({ children }) {
  return (
    <>
       <Navbar/>

      {children}
    </>
  );
}

