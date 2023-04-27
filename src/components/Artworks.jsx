import { useEffect } from 'react'
import { useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'


const Artworks = () => {
  const [nfts] = useGlobalState('nfts')
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return nfts.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [nfts, end])
  
  return (
    <div className="bg-[#a1afc0] gradient-bg-artworks">
        <div className="w-4/5 py-10 mx-auto">
          <h4 className="text-white text-3xl font-bold uppercase text-gradient">{collection.length > 0 ? 'Latest Artworks' : 'No Artworks Yet'}</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gaps-4 lg:gaps-3 py-2.5">
            {collection.map((nft, i) => (
                <Card key={i} nft={nft} />
            ))}
            
          </div>

          <div className='text-center my-5'>
          <button className="shadow-lg shadow-black text-white text-sm bg-[#ed48e5] hover:bg-[#f88ce2] rounded-full px-1.5 py-1"
          onClick={()=> setEnd(end + count)}
          >Load More</button>
          </div>
        </div>

    </div>
  )
}
const Card = ({nft}) =>  {
  const setNft = () => {
    setGlobalState('nft', nft)
    setGlobalState('showmodal', 'scale-100')
    
  }

  return(
    <div className='w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3'>
        <img className='h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3' src={nft.metadataURI} alt={nft.title} />
        <h4 className='text-white font-semibold'>{nft.title}</h4>
        <small></small>
        <p className='text-gray-400 text-sm my-1'>{nft.description}</p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col'>
                <small className='text-xs'>Current Price</small>
                <p className='text-sm font-semibold'>{nft.cost} ETH</p>
            </div>
            <button className="shadow-lg shadow-black text-sm bg-[#a229e3] hover:bg-[#b927b4] rounded-full px-1.5 py-1" onClick={setNft}>View Details</button>
        </div>
    </div>
)

}

export default Artworks