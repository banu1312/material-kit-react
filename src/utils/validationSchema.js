/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';

export const paymentValidationSchema = yup.object({
    namaHibah: yup
    .string('Masukkan Nama Hibah')
    .required('Nama Hibah harus di isi'),
    nominal: yup
    .number('Masukkan Nominal')
    .positive('Nominal harus angka positif')
    .required('nominal harus di isi'),
    metode: yup
    .string('Pilih Metode')
    .required("Metode Harus dipilih")
})

export const konfirmasiValidationSchema = yup.object().shape({
    file: yup
      .mixed()
      .required('File gambar diperlukan')
      .test('FILE_SIZE', 'File terlalu besar, maksimal 5MB', (value) => {
        // Pemeriksaan ukuran file
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test('FILE_TYPE', 'Tipe file tidak didukung', (value) => {
        if (!value) return true; 
        return value.type && value.type.startsWith('image/');
      }),
  });