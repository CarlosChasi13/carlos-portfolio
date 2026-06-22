"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Eye } from "lucide-react"
import { motion } from "framer-motion"

interface CertificateCardProps {
  /** Imagen de previsualización. Opcional si se pasa un pdfUrl. */
  image?: string
  /** URL del PDF del certificado. Si se pasa, se muestra una previa y el botón "Ver". */
  pdfUrl?: string
  title: string
  duration: string
  modality: string
  date: string
}

export function CertificateCard({ image, pdfUrl, title, duration, modality, date }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className="relative h-full overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 group-hover:border-blue-500/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative h-full flex flex-col">
          <div className="relative overflow-hidden h-48">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

            {pdfUrl && !image ? (
              // Previa del PDF embebido (sin controles para que se vea como una miniatura)
              <object
                data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                aria-label={`Previa del certificado: ${title}`}
                className="pointer-events-none w-full h-full"
              >
                <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-sm text-zinc-400">
                  Vista previa no disponible
                </div>
              </object>
            ) : (
              <img
                src={image || "/placeholder.svg"}
                alt={`Certificado: ${title}`}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
            )}

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver certificado ${title} en una nueva pestaña`}
                className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Eye className="h-4 w-4" />
                  Ver certificado
                </span>
              </a>
            )}
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-balance">{title}</h3>

            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{duration}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{modality}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
