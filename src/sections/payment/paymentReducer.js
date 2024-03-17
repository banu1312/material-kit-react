export const INITIAL_STATE = {
    formData:{
        namahibah:"",
        nominal:0,
        user_id:0,
        metodePembayaran:"",
        reveal:false,
        pesan:"",
        urlImage:""
    }
}

export const paymentReducer=(state,action)=>{
    switch(action.type){
        case 'CHANGE_INPUT':
            return{
                 ...state,
                formData: {
                    ...state.formData,
                    [action.payload.name]: action.payload.value,
                  },
            }
            case "UPDATE":
                return{
                    ...state,
                    formData: {
                        ...state.formData,
                        ...action.payload,
                      },
                }
        default:
            return state
    }
}