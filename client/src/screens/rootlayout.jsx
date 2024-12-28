import { useEffect } from "react";
import { Navbar } from "../components/navbar";
import Lenis from '@studio-freight/lenis'
import {Outlet} from "react-router-dom"
import { Analytics } from "@vercel/analytics/next";
import { useSetRecoilState } from "recoil";
import { articlesAtom, articlesInfoLoadingAtom, latestArticleAtom } from "../atoms/atoms";
export function RootLayout({children}){

    const setLoading = useSetRecoilState(articlesInfoLoadingAtom)
    const setArticles = useSetRecoilState(articlesAtom)
    const setLatestArticle = useSetRecoilState(latestArticleAtom)

    useEffect(() => {
        const getAllArticles = async () => {
           try {
             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}get-all-article`);
 
             if (!response.ok) {
                console.log(response)
                 return
             }
 
             const data = await response.json()
             setArticles(data.message)
             const latestAr = []
             for(let i=data.message.length-1; i>=0; i--){
                 latestAr.push(data.message[i]);
                 if(latestAr.length == 6) break;
             }
             setLatestArticle(latestAr)
             setLoading(false)
           } catch (error) {
                console.log(error)
                return
           }
        }
        getAllArticles()
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
        <Navbar />
        <div className="w-full pt-20 pb-10 px-2 sm:px-20">
            <Outlet>{children}</Outlet>
            <Analytics />
        </div>
    </div>)
}