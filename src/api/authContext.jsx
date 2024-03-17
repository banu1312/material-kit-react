/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { toast } from 'sonner'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";

// eslint-disable-next-line import/no-cycle
import {
  getUserInfo,
  putUserInfo,
  getUserLogged,
  deleteUserInfo,
  getAccessToken,
  putAccessToken,
  deleteAccessToken,
  login as reqLogin, 
  register as reqReg,
} from "./auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(() => getAccessToken() || null);
  const [userInfo, setUserInfo] = useState(() => JSON.parse(getUserInfo()) || null);
  const login = async ({ email, password }) => {
    const loginRes = await reqLogin({ email, password });
    if (loginRes.error) {
      toast.error("Gagal Masuk Mohon Cek ulang")
      return;
    }

    const  Token  = loginRes.data.data.token;

    putAccessToken(Token);
    setAccessToken(Token);

    const userRes = await getUserLogged();

    if (userRes.error) {
      toast.error("Gagal Masuk Mohon Cek ulang")
      return;
    }
    putUserInfo(userRes.data.user);
    setUserInfo(userRes.data.user);
    userRes.data.user.role.id === 2 ? navigate('/') : navigate('dashboard')
  };

  const register = async ({ email, password, name,birthDay,role_id,phone }) => {
    const registerRes = await reqReg({ email, password, name,birthDay,role_id,phone });
    if (registerRes.error) {
      toast.error("Gagal membuat Akun Mohon Cek Kembali")
      return;
    }
    await login({email, password})
  };

  const logout = () => {
    deleteAccessToken();
    deleteUserInfo();
    setAccessToken(null);
    setUserInfo(null);
  };

  return <AuthContext.Provider value={{ accessToken,
    userInfo,
    login,
    logout,
    register }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;