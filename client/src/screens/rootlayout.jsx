import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import Lenis from '@studio-freight/lenis'
import {Outlet} from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { numberOfArticlesAtom, toastMsgAtom } from "../atoms/atoms";
import Footer from "../components/footer";
import { Toast } from "../components/toaster";
import { AdminLoader } from "../components/loader";
export function RootLayout({children}){

    const [toastMsg, setToastMsg] = useRecoilState(toastMsgAtom)
    const setNumberOfArticle = useSetRecoilState(numberOfArticlesAtom)
 
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
        const getNumberOfArticles = async () => {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}get-number-of-article`);  
            if (!response.ok) {
                console.log(response)
                return
            }
            const data = await response.json()
            setNumberOfArticle(data.message)
            setLoading(false)
        }
        getNumberOfArticles()
    }, [])

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return(<div className="w-screen min-h-screen overflow-hidden">
        {loading && <AdminLoader />}
        {toastMsg !== "" &&
            <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
        <Navbar />
        <div className="w-full pt-20 pb-10 px-2 sm:px-20">
            <Outlet>{children}</Outlet>
        </div>
        <Footer />
    </div>)
}