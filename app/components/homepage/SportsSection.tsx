"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { Article } from "@/app/types";


interface SportsSectionProps {
  articles: Article[];
}


export default function SportsSection({ articles }: SportsSectionProps) {
  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#1a2942] via-[#2d1b4b] to-[#1b3b3b] overflow-hidden">
      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid grid-cols-12 gap-4 h-[80vh]">
          {/* Left Column */}
          <div className="col-span-12 md:col-span-3 grid grid-rows-3 gap-4">
            {[1, 4, 6].map((index) => (
              articles[index] && (
                <motion.div
                  key={articles[index].id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg border-2 border-white/10 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <div className="relative h-full">
                    <Image
                      src={articles[index].imageURL || "/placeholder.png"}
                      alt={articles[index].title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[1px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-bold tracking-wider">
                          {articles[index].category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-all duration-300">
                        {articles[index].title}
                      </h3>
                      <p className="text-sm text-white/70 mt-2">{articles[index].source}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>

          {/* Center Column (Featured Article) */}
          <div className="col-span-12 md:col-span-6 grid grid-rows-3 gap-4">
            {articles[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="row-span-2 relative group"
              >
                <div className="relative h-full rounded-xl overflow-hidden border-4 border-white/10">
                  <Image
                    src={articles[0].imageURL || "/placeholder.png"}
                    alt={articles[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        <span className="text-yellow-400 font-bold tracking-wider">FEATURED</span>
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                        {articles[0].title}
                      </h2>
                      <p className="text-lg text-white/90 mb-2">{articles[0].summary}</p>
                      <p className="text-sm text-white/70">{articles[0].source}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Two Articles Below Featured */}
            <div className="grid grid-cols-2 gap-4">
              {[7, 8].map((index) => (
                articles[index] && (
                  <motion.div
                    key={articles[index].id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-lg border-2 border-white/10 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <div className="relative h-full">
                      <Image
                        src={articles[index].imageURL || "/placeholder.png"}
                        alt={articles[index].title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[1px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm tracking-wider">{articles[index].category}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-all duration-300 line-clamp-2">
                          {articles[index].title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-3 grid grid-rows-3 gap-4">
            {[2, 3, 5].map((index) => (
              articles[index] && (
                <motion.div
                  key={articles[index].id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg border-2 border-white/10 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <div className="relative h-full">
                    <Image
                      src={articles[index].imageURL || "/placeholder.png"}
                      alt={articles[index].title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[1px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-bold tracking-wider">{articles[index].category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-all duration-300">
                        {articles[index].title}
                      </h3>
                      <p className="text-sm text-white/70 mt-2">{articles[index].source}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}