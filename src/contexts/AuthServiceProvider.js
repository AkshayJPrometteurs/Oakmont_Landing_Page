"use client";

import Cookies from "js-cookie";
import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import CryptoJS from 'crypto-js';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "@/components/utils/LoadingComponent";

const AuthContext = createContext({
    user : {},
    setUser : () => {},
    token : '',
    setToken : () => {},
    isAuthenticated : '',
    setIsAuthenticated : () => {},
});

export const AuthServiceContext = ({children}) => {
    let access_token_data = Cookies.get('_om_at');
    let access_user_data = Cookies.get('_om_uda');

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(access_token_data || "");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setToken = (access_token,access_data) => {
        if(access_token){
            Cookies.set("_om_at", access_token, { expires: 1, secure: true });
            Cookies.set("_om_uda", CryptoJS.AES.encrypt(JSON.stringify(access_data),"OakMontAccessData").toString(), { expires: 1, secure: true });
        }else{ Cookies.remove("_om_at"); Cookies.remove("_om_uda"); }
        setUser(access_data);
        _setToken(token);
    }

    useEffect(() => {
        if(access_token_data && access_user_data){
            let access_user_data_for_use = JSON.parse(CryptoJS.AES.decrypt(access_user_data, "OakMontAccessData").toString(CryptoJS.enc.Utf8));
            setIsAuthenticated(access_user_data_for_use?.email ? true : false);
            setUser(access_user_data_for_use);
        }else{ Cookies.remove("_om_at"); Cookies.remove("_om_uda"); }
    },[access_token_data, access_user_data])

    return(
        <AuthContext.Provider value={{ user, setUser, token, setToken, isAuthenticated }}>
            <Suspense fallback={<LoadingComponent/>}>{children}</Suspense>
            <ToastContainer />
        </AuthContext.Provider>
    )
}

export const useAuthServiceContext = () => useContext(AuthContext);