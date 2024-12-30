import { motion } from 'framer-motion'
import { ArticlesCarousel } from '../components/carouselarticle'
import { AnimeCard } from '../components/AnimeCard'
import {ChevronRight} from "lucide-react"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdminLoader } from '../components/loader'
import { useSetRecoilState } from 'recoil'
import { toastMsgAtom } from '../atoms/atoms'
import { AnimeLogo } from '../components/animelogo'


export function AnimePage () {
    const [articleInfo, setArticleInfo] = useState(undefined)
    const setToastMsg = useSetRecoilState(toastMsgAtom)
    const [loading, setLoading] = useState(true)
    const {articleTitle} = useParams()

    useEffect(() => {
        const getArticleInfo = async () => {
          try {
              const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}article/${articleTitle}`, {
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                  }
              });
              if (!response.ok) {
                  setLoading(false)
                  setToastMsg("something went wrong")
                  return
              }
              const data = await response.json()
              if(data.message){
                  setArticleInfo(data.message[0])
              }
              setLoading(false)
          } catch (error) {
              setLoading(false)
              setToastMsg("something went wrong")
          }
        }
        getArticleInfo()
    }, [])

   
 
    return (
       <>
            <main className="relative min-h-screen sm:p-8 p-2">
                {loading && <AdminLoader />}

                <motion.h1
                    className="text-5xl md:text-7xl font-bold text-center text-primary mb-4 float"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {articleInfo?.title}
                </motion.h1>
                <motion.div className='h-fit w-full overflow-hidden rounded' >
                    <motion.div
                        className="h-[20%] items-center flex gap-4 text-primary"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <AnimeLogo />
                        <p>{articleInfo?.title.slice(19,articleInfo?.title.length)}</p>
                    </motion.div>
                    <div className='w-full h-[80%] overflow-hidden '>
                        <motion.img
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: -50 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className='w-full rounded' src={articleInfo?.bannerImgLink} />
                    </div>
                    
                </motion.div>

                <motion.p
                    className="text-xl text-center text-desc mb-10 mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    {articleInfo?.intro}
                </motion.p>


                <motion.div
                    className="flex flex-col bg-dark text-desc gap-3 p-8 rounded mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    <h3>Anime List in this article:</h3>
                    {articleInfo?.List?.map((a, i) => {
                        return <div key={i} className='flex gap-2' ><ChevronRight /> <p>{a.name}</p></div>
                    })}

                </motion.div>

                <div className="flex flex-col justify-center items-center gap-8">
                    {articleInfo?.List?.map((anime, index) => (
                        <AnimeCard key={index} anime={anime} index={index} />
                    ))}
                </div>
                <ArticlesCarousel />
            </main>
       </>
    )
}


