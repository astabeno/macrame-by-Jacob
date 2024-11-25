import Image from 'next/image'

export default function AboutCard() {
   return (
      <div className="m-0 w-full">
         <div
            className="about-middleeastmacrame flex flex-col border-8
                       border-gray-700 bg-gray-700 lg:flex-row">
            <div className="mx-auto bg-gray-700">
               <Image
                  className=""
                  src="/worldZoomed.webp"
                  alt="image"
                  width={800}
                  height={600}
                  sizes=""
                  cover
               />
            </div>

            <div className="writing bg-gray-700 p-5 lg:w-1/2 xl:w-1/3 xl:p-12">
               <h4
                  className="title mb-4 text-center text-2xl font-extrabold 
                              tracking-tight text-gray-200">
                  About Middle East Macrame
               </h4>
               <p className="text mb-5 leading-normal text-white">
                  Welcome to our online store featuring beautiful and unique
                  macrame products Jacob made in the Middle East! Macrame has
                  ancient origins in the Middle East. It&#39;s been used for
                  decoration and clothing for thousands of years. While living
                  in The Middle East the Stabeno so this art on walls of cafes.
                  Jacob was inspired by the art he saw and decided to make his
                  own.
               </p>
               <p className="text mb-5 leading-normal text-white">
                  Jacob creates stunning macrame pieces, from wall hangings to
                  plant hangers and more. Each piece is made with care and
                  attention to detail, highlighting the rich cultural heritage
                  of macrame in the Middle East. Browse our collection and add a
                  touch of style to your home or office today!
               </p>
            </div>
         </div>

         <div
            className="about-Jacob flex flex-col border-8 
                       border-gray-700 bg-gray-700 lg:flex-row-reverse">
            <div className="mx-auto bg-gray-700 lg:w-1/2 xl:w-2/3">
               <Image
                  className=""
                  src="/about-pic.webp"
                  alt="image"
                  width={800}
                  height={600}
               />
            </div>
            <div className="writing bg-gray-700 p-5 lg:w-1/2 xl:w-1/3 xl:p-12">
               <h4
                  className="title my-4 text-center text-2xl font-extrabold 
                              tracking-tight text-gray-200">
                  About Jacob
               </h4>
               <p className="text mb-5 leading-normal text-white">
                  Jacob has always been good with making things with knots and
                  yarn. When he was younger in and living in Jordan he started
                  making lanyards. At first he did the normal style every kid
                  does at some point, but he started making better and better
                  ones. He has always had a keen attention to detail and he has
                  always used this in designing things.
               </p>
               <p className="text mb-5 leading-normal text-white">
                  Even though he is a native Texan, he has lived most of his
                  life in the Middle East. This connection with Arabia has
                  inspired much of his work. We hope you enjoy his art and allow
                  it to bring the flavors of both Texas and The Middle East to
                  your home.
               </p>
            </div>
         </div>
      </div>
   )
}
