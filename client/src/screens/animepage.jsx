import { motion } from 'framer-motion'
import { ArticlesCarousel } from '../components/carouselarticle'
import { AnimeCard } from '../components/AnimeCard'
import {ChevronRight} from "lucide-react"

const animeEntries = [
    {
        rating: "90%",
        duration: "24 min",
        episodes: "24",
        name: "Attack on Titan",
        seasons: "4",
        format: "TV",
        shortDescription: "Humanity's last stand against giant humanoids",
        longDescription: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigandddddddddddddddddddddddddddddd jsadfh jasdf askjdfh kjasd hfkjas dfkjash dfkljas dfkasj dhfkasj tic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to rid the world of Titans after a Titan brings about the destruction of his hometown and the death of his mother.",
        images: [
            "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/AoT-Season-4-Feature.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
            "https://assetsio.gnwcdn.com/attack-on-titan-watch-order-aot.jpg?width=1920&height=1920&fit=bounds&quality=80&format=jpg&auto=webp",
            "https://images.justwatch.com/poster/306747132/s166/attack-on-titan.avif"
        ],
        imageCredits: "Images by Studio Wit",
        tags: ["Action", "Dark Fantasy", "Post-apocalyptic"],
        releaseDate: "April 7, 2013",
        studio: "Wit Studio",
        finalCredits: "Based on the manga by Hajime Isayama",
        rec: {
            img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/AoT-Season-4-Feature.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
            title: "top animes like aot",
            desc: "desc lorem ipusm",
            link: "https://",
        }
    },
    {
        rating: "90 %",
        duration: 24,
        episodes: 24,
        name: "Attack on Titan",
        seasons: 4,
        format: "TV",
        rec: {
            img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/AoT-Season-4-Feature.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
            title: "top animes like aot",
            desc: "desc lorem ipusm",
            link: "https://",
        },
        name: "My Hero Academia",
        shortDescription: "A quirkless boy's journey to become the greatest hero",
        longDescription: "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk. After being the only one to try and save his childhood bully from a Villain, Japan's greatest Hero, All Might, bestows upon him his own quirk 'One For All'.",
        images: [
            "/placeholder.svg?height=400&width=600&text=My+Hero+Academia+1",
            "/placeholder.svg?height=400&width=600&text=My+Hero+Academia+2",
            "/placeholder.svg?height=400&width=600&text=My+Hero+Academia+3"
        ],
        imageCredits: "Images by Studio Bones",
        tags: ["Superhero", "Action", "School"],
        releaseDate: "April 3, 2016",
        studio: "Bones",
        finalCredits: "Based on the manga by Kohei Horikoshi"
    }
]

export function AnimePage () {
    const title = "Top 10 anime of all time"
    const intro = `Anime has captured hearts worldwide with its stunning visuals and unforgettable stories. From timeless classics to modern masterpieces, these 10 shows stand as the best of the best. Dive in and discover the anime that shaped the medium and left a lasting legacy!`

    return (

        <main className="min-h-screen bg-background sm:p-8 p-2">
            <motion.h1
                className="text-5xl md:text-7xl font-bold text-center text-primary mb-4 float"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
               {title}
            </motion.h1>
            <motion.p
                className="text-xl text-center text-desc mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {intro}
            </motion.p>
            <motion.div
                className="flex flex-col bg-dark text-desc gap-3 p-8 rounded mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <h3>Anime List in this article:</h3>
                {animeEntries.map((a,i) => {
                    return<div className='flex gap-2' ><ChevronRight /> <p>{a.name}</p></div>
                })}
            </motion.div>
            
            <div className="flex flex-col justify-center items-center gap-8">
                {animeEntries.map((anime, index) => (
                    <AnimeCard key={index} anime={anime} index={index} />
                ))}
            </div>
            <ArticlesCarousel />
        </main>
    )
}


