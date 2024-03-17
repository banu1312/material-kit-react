import apiClient from "./apiClient";
import { getAccessToken } from "./auth";

const token = getAccessToken()
export async function create(state){
  const {namaHibah,nominal,metode,reveal,user_id,pesan} = state.v
  const nominalBaru = Number(nominal)
    try {
        const {data} = await apiClient.post("/payment/",{namaHibah,nominal:nominalBaru,metode,reveal,user_id,pesan},{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return { error: false,data };
      } catch (e) {
        return { error: true, data: e.response.data.message };
      }
}

export async function update(state,id){
  const {file} = state
  const formData = new FormData();
  formData.append('file', file); // Tambahkan file ke FormData
    try {
        const {data} = await apiClient.post(`/payment/${id}`,formData,{
            headers: {
                "Content-Type":'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return { error: false,data };
      } catch (e) {
        return { error: true, data: e.response.data.message };
      }
}

export async function verifikasi(id){
    try {
        const {data} = await apiClient.put(`/payment/${id}`,{},{
            headers: {
                "Content-Type":'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return { error: false,data };
      } catch (e) {
        return { error: true, data: e.response.data.message };
      }
}

export async function getData(){
    try {
        const {data} = await apiClient.get(`/payment/`,{
            headers: {
                "Content-Type":'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return { error: false,data };
      } catch (e) {
        return { error: true, data: e.response.data.message };
      }
}