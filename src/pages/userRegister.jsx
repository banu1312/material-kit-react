import { Helmet } from "react-helmet-async";

import { RegisterView } from "src/sections/register";

export default function UserRegister(){
    return(
        <>
            <Helmet>
                <title> Register | User </title>
            </Helmet>

            <RegisterView />
        </>
    )
}