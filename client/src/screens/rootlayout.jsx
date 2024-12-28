import { useEffect } from "react";
import { Navbar } from "../components/navbar";
import Lenis from '@studio-freight/lenis'
import {Outlet} from "react-router-dom"
export function RootLayout({children}){
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
        <Navbar />
        <div className="w-full pt-20 pb-10 px-2 sm:px-20">
            <Outlet>{children}</Outlet>
        </div>
    </div>)
}