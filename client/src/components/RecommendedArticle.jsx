import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { CurrentPageArticlesAtom } from '../atoms/atoms'
import { useNavigate } from 'react-router-dom'
import { ArticlesCarousel } from './carouselarticle'
import { Helmet } from 'react-helmet-async'

export function RecommendedArticles() {
    const navigate = useNavigate()
    const articles = useRecoilValue(CurrentPageArticlesAtom)

    const pageTitle = articles?.[0]?.title || "Anime Page"
    const pageDescription =
        articles?.[0]?.intro || "Explore amazing anime articles and recommendations"
    const pageImage = articles?.[0]?.bannerImgLink || "/default-banner.jpg"

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:type" content="article" />
            </Helmet>

            <ArticlesCarousel title="Latest Articles" />

            <section className="mt-20" aria-labelledby="browse-articles-title">
                <motion.h2
                    id="browse-articles-title"
                    className="text-3xl font-bold text-primary mb-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Browse all Articles
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles?.map((article, index) => (
                        <motion.article
                            aria-labelledby={`article-title-${index}`}
                            aria-describedby={`article-desc-${index}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`/anime/${article?.title}`)}
                            key={index}
                            className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img
                                loading='lazy'
                                src={article?.bannerImgLink || "/default-banner.jpg"}
                                alt={`Banner for ${article?.title || "Unknown article"}`}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3
                                    id={`article-title-${index}`}
                                    className="text-xl font-bold text-primary mb-2"
                                >
                                    {article?.title || "Untitled Article"}
                                </h3>
                                <p
                                    id={`article-desc-${index}`}
                                    className="text-desc mb-4"
                                >
                                    {article?.intro?.length > 40
                                        ? article?.intro.slice(0, 40) + "..."
                                        : article?.intro || "No description available"}
                                </p>
                                <a
                                    aria-label={`Read more about ${article?.title}`}
                                    href={`/anime/${article?.title}`}
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
        </>
    )
}
