import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { RecommendedArticles } from "../components/RecommendedArticle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentPageArticlesAtom, latestArticleAtom, numberOfArticlesAtom } from "../atoms/atoms";
import { AdminLoader } from "../components/loader";
import { Helmet } from "react-helmet-async";

const PAGE_LIMIT = 6;
export default function HomePage(){

    const [currentPage, setCurrentPage] = useState(1)
    const numberOfArticle = useRecoilValue(numberOfArticlesAtom)
    const setCurrentPageArticle = useSetRecoilState(CurrentPageArticlesAtom)
    const [loading, setLoading] = useState(false)
 
   
    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    
        setLoading(true)
        const getCurrentPageArticle = async () => {
            try {
                let limit = Math.min(PAGE_LIMIT,numberOfArticle)
                let offset = (currentPage-1)*limit;

                if (numberOfArticle === 0) return;

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}get-all-article?limit=${limit}&offset=${offset}`);

                if (!response.ok) {
                
                    return
                }

                const data = await response.json()
                setCurrentPageArticle(data.message)
                setLoading(false)
            } catch (error) {
              
                return
            }
        }
        getCurrentPageArticle()
    }, [currentPage, numberOfArticle])


    return(<>
        <Helmet>
            <title>top animes</title>
            <link rel="canonical" href="https://www.topanimes.midsane.tech/" />
            <meta name="description" content="Latest trendy animes, Get similar animes like your favourite ones here" />
            <meta rel="canonical" href={window.location.href} />  
        </Helmet>
        <main className="flex flex-col" >
            {loading && <AdminLoader />}
            <RecommendedArticles />
            <Pagination currentPage={currentPage} totalPages={Math.ceil(numberOfArticle / PAGE_LIMIT)} onPageChange={setCurrentPage} />
        </main>
    </>)
}