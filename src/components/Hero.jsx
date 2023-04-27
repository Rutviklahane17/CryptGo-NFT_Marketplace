import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState, truncate } from '../store'
import nfthomepage from '../assets/nfthomepage.jpg'

const Hero = () => {

  const [connectedAccount] = useGlobalState('connectedAccount')
  const onCreatedNFT = () => {
    setGlobalState('modal', 'scale-100')
  } 

  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10">
        <div className="md:w-3/6 w-full">
            <div>
                <h1 className="text-white text-5xl font-bold ">Discover the <span className="text-gradient-n">hottest</span> <br/> Digital arts, <br />
                   <span className="text-gradient-n">NFTs</span> Collections
                </h1>
                <p className="text-white font-semibold text-sm mt-3">Mint and collect the exciting NFTs.</p>
            </div>

            <div className="flex mt-10">
                <button className="shadow-xl shadow-black text-white  glow-on-hover" onClick={() => setGlobalState('modal', 'scale-100')}>Create NFT</button>
            </div>
          
            <div className="w-3/4 flex justify-between items-center mt-10">
              <div className="text-black">
                <p className="font-bold">148K</p>
                <small className="text-black">Users</small>
              </div>

              <div className="text-black">
                <p className="font-bold">57K</p>
                <small className="text-black">Artists</small>
              </div>

              <div className="text-black">
                <p className="font-bold">163K</p>
                <small className="text-black">Artworks</small>
              </div>
              
            </div>

        </div>

        <div className='shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800'>
          <img className="h-60 w-full object-cover" src={nfthomepage} alt=""  />

          <div className='flex justify-start items-center p-3'>
            <Identicon  className="h-10 w-10  object-contain rounded-full mr-3" string = {connectedAccount} size={50}/>
            <div>
              <p className='text-white font-semibold '>{truncate(connectedAccount, 6,3,11)}</p>
              <small className='text-green-300 font-bold'>You</small>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero