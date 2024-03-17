/* eslint-disable import/no-extraneous-dependencies */
import { useState, useContext  } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import useInput from 'src/hooks/useInput';

import { bgGradient } from 'src/theme/css';
// import { useAuthContext } from 'src/api/authContext';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import useDate from 'src/hooks/useDate';

import AuthContext from 'src/api/authContext';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const { register } = useContext(AuthContext);
  const [email,onEmailChange] = useInput("")
  const [name,onNameChange] = useInput("")
  const [birthDay,onBirthDayChange] = useDate("")
  const [phone,onNomerChange] = useInput("")
  const [password,onPasswordChange] = useInput("")

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    await register({ email, password, name,birthDay,role_id:2,phone });
  };
  const renderForm = (
    <>
      <Stack spacing={3} my={3}>
        <TextField name="name" label="Full Name" onChange={onNameChange}/>
        <TextField name="nomer" label="Phone Number" onChange={onNomerChange}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'DatePicker',
                  'MobileDatePicker',
                  'DesktopDatePicker',
                  'StaticDatePicker',
                ]}
                >
                  <DatePicker 
                  label="Birth Date"
                  onChange={onBirthDayChange}
                  disableFuture
                  // slotProps={{ textField: { helperText:state.validationErrors.RegisterDate , error:!!state.validationErrors.RegisterDate} }}
                  />

              </DemoContainer>
            </LocalizationProvider>
        <TextField name="email" label="Email address" onChange={onEmailChange}/>
        
        <TextField
          name="password"
          label="Password"
          onChange={onPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{mb:3}}>Registration Account</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
