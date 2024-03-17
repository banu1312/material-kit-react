/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import { toast } from 'sonner';
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridMoreVertIcon, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Toolbar, Tooltip, Popover, MenuItem, IconButton, OutlinedInput, InputAdornment } from '@mui/material';

import useInput from 'src/hooks/useInput';

import FullImage from 'src/pages/fullImage';
import { getData, verifikasi } from 'src/api/payment';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';



// ----------------------------------------------------------------------

export default function PembayaranView() {
  const [numSelected,setSelected] = useState([])
  const [id,setId] = useState([])
  const [data,setData] = useState([])
  const [search,onSearchChange] = useInput()
  const [open, setOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [loading,setLoading] = useState(false)

  const columns = [
    { field: 'No', headerName: 'No', headerAlign: 'center',align:'center', width: 50 },
    {
      field: 'namaHibah',
      headerName: 'Nama Hibah',
      headerAlign: 'center',
      align:'center',
      width: 165,
    },
    {
      field: 'name',
      headerName: 'Nama Donatur',
      headerAlign: 'center',
      align:'center',
      width: 165,
    },
    {
      field: 'nominal',
      headerName: 'Nominal',
      headerAlign: 'center',
      align:'center',
      width: 145,
      valueGetter:(params)=>{
        const sellingPrice = params.row.nominal
        return `IDR ${sellingPrice.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })}`}
    },
    { field: 'imageData', headerName: 'Bukti Pembayaran', width: 150,headerAlign:'center', renderCell: (params) =>
    <button
    onClick={() => openFullscreen(`data:image/bmp;base64,${params.value}`)}
    className="image-button"
    style={{ background:"none",cursor:'pointer' , border:"none"}}
  >
    <span className="image-span" aria-hidden="true">
      <img
        src={`data:image/bmp;base64,${params.value}`}
        alt='pic'
        style={{ height: "100%" }}
      />
    </span>
    <span className="image-text">View Image</span>
  </button>},
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    align:'center',
    width: 165,
  },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 90,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<GridMoreVertIcon />}
            label="3Dots"
            className="textPrimary"
            onClick={(e)=>handleActionClick(e,id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  const openFullscreen = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };
  const closeFullscreen = () => {
    setFullscreenImage(null);
  };
  const handleActionClick = (event , Id)=> {
    setOpen(event.currentTarget)
    setId([Id])
  };
  const handleClosePopover=()=>{
    setOpen(false)
  }
  const handleEditClick = ()=> {
    setLoading(true)
    verifikasi(id).then(res=>{
      if(res.error === true){
        toast.error("Failed To Verifikasi Data")
      }
      setLoading(false)
    })
    handleClosePopover()
  };
  useEffect(() => {
    getData().then((res) => {
      setData(
        res.data.data.map((row, i) => ({
          ...row,
          No: i + 1,
          id: row.payment.id,
          name: row.payment.reveal === "true" ? row.payment.user.name : "Hamba Allah",
          namaHibah: row.payment.namaHibah,
          nominal: row.payment.nominal,
          status:row.payment.status,
        }))
      );
    });
  }, []);
  return (
    <>
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Donasi</Typography>
      </Stack>

      <Card>
        <Scrollbar>
        <Toolbar
          sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 1, 0, 3),
            ...(numSelected.length > 0 && {
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            }),
          }}
        >
          {numSelected.length > 0 ? (
            <Typography component="div" variant="subtitle1">
              {numSelected.length} selected
            </Typography>
          ) : (
            <OutlinedInput
              value={search}
              onChange={onSearchChange}
              placeholder="Search user..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
            />
          )}

          {numSelected.length > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        {loading ? (
          <Typography variant='subtitle1' textAlign='center'>Loading.....</Typography>
        ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            onRowSelectionModelChange={(s)=>{
              setSelected(s)
            }}
            checkboxSelection 
            pageSizeOptions={[5]}
          />
        </Box>
        )}    
        </Scrollbar>
      </Card>
    </Container>

    <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={()=>handleClosePopover()}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
            >
            <MenuItem onClick={()=>{handleEditClick()}} disabled={data.some(item => item.status === 'Diverifikasi')}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }}/>
                Verifikasi
            </MenuItem>
    </Popover>
            {fullscreenImage && (
                <FullImage fullImage={fullscreenImage} closeFullscreen={closeFullscreen}/>
            )}
    </>
  );
}
