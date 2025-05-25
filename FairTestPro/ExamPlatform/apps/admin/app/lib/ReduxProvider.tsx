"use client"

import { store } from "@repo/store/client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";


export function ReduxProvider({children}:{children:React.ReactNode}){
    return (
        <Provider store={store}>
            <SessionProvider>
            {children}
            </SessionProvider>
        </Provider>
    )
}