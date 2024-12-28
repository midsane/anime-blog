import { motion } from 'framer-motion'
import { ImageCarousel } from './ImageCarousel'
import { ExternalLink, ChevronDown, ChevronUp, Smile, Meh,Frown, Clock, Disc, Tv, Snowflake, Cat } from "lucide-react"
import { useState } from 'react'

export function AnimeCard({ anime, index }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            className="bg-dark rounded-lg shadow-lg overflow-hidden w-1/2 min-w-[30rem] max-[500px]:min-w-[25rem] max-[400px]:min-w-80"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <ImageCarousel images={anime.images} alt={anime.name} />
            <div className="p-6">
                <motion.h2
                    className="text-3xl font-bold text-name mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {anime.name}
                </motion.h2>

                <motion.div
                    className="text-primary mb-4 flex justify-around items-center bg-secondary p-1 sm:p-2 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <InfoTags content="Format" val={anime.format} />
                    <InfoTags content="Rating" val={anime.rating} />
                    <InfoTags content="Duration" val={anime.duration} />
                    <InfoTags content="Seasons" val={anime.seasons} />
                    <InfoTags content="Episodes" val={anime.episodes} />

                </motion.div>
                <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {anime.tags.map((tag, i) => (
                        <span key={i} className="bg-stone-800 text-orange px-2 py-1 rounded text-sm">
                            {tag}
                        </span>
                    ))}
                </motion.div>
                <motion.p

                    className="text-desc mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    {isExpanded ? anime.longDescription.length > 40
                        ? anime.longDescription.slice(0, 40) + "..."
                        : anime.longDescription :
                        anime.longDescription
                    }

                </motion.p>
                <span onClick={() => setIsExpanded(!isExpanded)} className='text-desc px-2 py-1 flex justify-between cursor-pointer w-fit gap-3 rounded bg-secondary'>{!isExpanded ?
                    <> <p >View Less:</p>
                        <ChevronUp color='yellow' /> </> :
                    <>
                        <p >View more:</p>
                        <ChevronDown color='yellow' />
                    </>

                } </span>

                <div className="text-sm mt-4 text-date">
                    <p>Release Date: {anime.releaseDate}</p>
                    <p>Studio: {anime.studio}</p>
                </div>
                <p className="text-xs text-credits mt-4">{anime.imageCredits}</p>
                <p className="text-xs text-credits mt-1">{anime.finalCredits}</p>
                {anime.rec &&
                    <motion.div className='mt-2 cursor-pointer flex p-4 rounded bg-secondary flex-col gap-2'>
                        <div className='flex justify-between' >

                            <h4 className='text-name'>Recommended Read</h4>
                            <ExternalLink color='white' />
                        </div>
                        <div className='flex flex-col sm:flex-row overflow-hidden gap-6'>
                            <img src={anime.rec.img} className='rounded h-20 object-cover' />
                            <div className='flex flex-col' >
                                <p className='text-orange' >{anime.rec.title}</p>
                                <p className='text-slate-300' >{anime.rec.desc}</p>
                            </div>
                        </div>
                    </motion.div>}
            </div>
        </motion.div>
    )
}

const InfoTags = ({ content, val }) => {
    let svg;
    let text = val
    let svgSize = 20
    switch (content) {
        case "Format":
            if (val.toLowerCase() == "tv") {
                svg = <Tv size={svgSize} />
                text = "Tv"
            }
            else svg = <Disc size={svgSize} />
            break;
        case "Rating":
            if(val > 80){
                svg = <Smile size={svgSize} />
            }
            else if(val > 70) svg = <Meh size={svgSize} />
            else svg = <Frown size={svgSize} />
            break;

        case "Episodes":
            svg = <Cat size={svgSize} />
            text += " Eps"
            break;
        case "Duration":
            svg = <Clock size={svgSize} />
            break;
        case "Seasons":
            svg = <Snowflake size={svgSize}  />
            text += " Se."

    }
    return (<div className='px-4 py-2 max-[400px]:px-2 bg-dark flex sm:gap-2 gap-1 justify-center items-center flex-col rounded-lg text-sm '>
           <div className='flex gap-1 sm:gap-2 flex-col sm:flex-row justify-center items-center ' >
            <span>{svg}</span>
            <p>{text}</p>
           </div>
           <p className='max-[500px]:hidden block' >{content}</p>
    </div>)
}