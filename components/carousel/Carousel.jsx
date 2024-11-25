import React, { useCallback } from 'react'

import { useRouter } from 'next/router'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import PieceThumb from '../piece/PieceThumb'

import { PrevButton, NextButton } from './EmblaArrows'

import classes from './carousel.module.css'

export default function Carousel({ pieces }) {
   const router = useRouter()
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

   const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev()
   }, [emblaApi])

   const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
   }, [emblaApi])

   const onSlideClick = useCallback(
      (id) => {
         if (emblaApi && emblaApi.clickAllowed()) {
            router.push(`/pieces/${id}`)
         }
      },
      [emblaApi]
   )

   return (
      <div className={classes.embla}>
         <div className={classes.embla_viewport} ref={emblaRef}>
            <div className={classes.embla_container}>
               {pieces.map((piece) => {
                  return (
                     <div
                        key={piece.id}
                        onClick={() => onSlideClick(piece.id)}
                        className={`${classes.embla_slide}`}>
                        <PieceThumb piece={piece} />
                     </div>
                  )
               })}
            </div>
            <PrevButton onClick={scrollPrev} />
            <NextButton onClick={scrollNext} />
         </div>
      </div>
   )
}
