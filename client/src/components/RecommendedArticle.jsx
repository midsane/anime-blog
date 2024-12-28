import { motion } from 'framer-motion'

const articles = [
    {
        title: "The Evolution of Attack on Titan's Animation",
        description: "Explore how the animation style of Attack on Titan has evolved over its seasons.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    }
    ,
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    }
    
    ,{
        title: "Analyzing the Hero Society in My Hero Academia",
        description: "A deep dive into the complexities of the hero-based society in My Hero Academia.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "#"
    },
    {
        title: "Top 10 Most Impactful Anime of the Decade",
        description: "Discover which anime series have left the biggest mark on the industry in recent years.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2"
    }
    ,
    {
        title: "Top 10 Most Impactful Anime of the Decade",
        description: "Discover which anime series have left the biggest mark on the industry in recent years.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2"
    }
    ,
    {
        title: "Top 10 Most Impactful Anime of the Decade",
        description: "Discover which anime series have left the biggest mark on the industry in recent years.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2"
    }
    ,
    {
        title: "Top 10 Most Impactful Anime of the Decade",
        description: "Discover which anime series have left the biggest mark on the industry in recent years.",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2",
        link: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/09/dandadan-cover.jpg?q=49&fit=crop&w=825&dpr=2"
    }
]

export function RecommendedArticles() {
    return (
        <section className="mt-16">
            <motion.h2
                className="text-3xl font-bold text-primary mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recommended Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <motion.article
                        key={index}
                        className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-primary mb-2">{article.title}</h3>
                            <p className="text-desc mb-4">
                                {article.description.length > 40
                                    ? article.description.slice(0, 40) + "..."
                                    : article.description}
                            </p>
                            <a
                                href={article.link}
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

