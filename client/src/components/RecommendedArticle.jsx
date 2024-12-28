import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { articlesAtom, articlesInfoLoadingAtom } from '../atoms/atoms'
import { useNavigate } from 'react-router-dom'



export function RecommendedArticles() {
    
    const navigate = useNavigate()
    const articles = useRecoilValue(articlesAtom)
    const loading = useRecoilValue(articlesInfoLoadingAtom)
    

    return (
        <section className="mt-2">
            <motion.h2
                className="text-3xl font-bold text-primary mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recommended Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles?.map((article, index) => (
                    <motion.article
                        onClick={() => navigate(`/anime/${article?.title} `)}
                        key={index}
                        className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={article?.bannerImgLink} alt={article?.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-primary mb-2">{article?.title}</h3>
                            <p className="text-desc mb-4">
                                {article?.intro.length > 40
                                    ? article?.intro.slice(0, 40) + "..."
                                    : article?.intro}
                            </p>
                            <a
                                href={`/anime/${article?.title} `}
                                className="inline-block bg-dark bg-opacity-55 active:scale-105 ease-linear 
                                 text-name px-4 py-2 rounded hover:bg-opacity-100 transition-colors duration-300"
                            >
                                Read More
                            </a>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    )
}

