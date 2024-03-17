import { Helmet } from 'react-helmet-async';

import PembayaranView from 'src/sections/Pembayaran/view/pembayaran-view';

// ----------------------------------------------------------------------

export default function PembayaranPage() {
  return (
    <>
      <Helmet>
        <title> Pembayaran Page </title>
      </Helmet>

      <PembayaranView />
    </>
  );
}
