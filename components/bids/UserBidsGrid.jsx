import Bid from './Bid'

export default function UserBidsGrid({ bids }) {
   return (
      <div>
         <div className="grid grid-cols-3 bg-gray-700 p-3 text-white">
            <div>
               <h2 className="font-extrabold">Piece Name</h2>
            </div>
            <div className="font-extrabold">
               <h2>Bid Amount</h2>
            </div>
            <div className="font-extrabold">
               <h2>Time</h2>
            </div>
         </div>
         {bids.map((bid) => (
            <div className="border-b p-3" key={bid.id}>
               <Bid bid={bid} type="user" />
            </div>
         ))}
      </div>
   )
}
