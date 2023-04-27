import { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import { setGlobalState, setLoadingmsg, truncate, useGlobalState } from '../store'
import Identicon from 'react-identicons'
import { buyNFT } from '../Blockchain.services'

const ShowNFT = () => {
    
    const [connectedAccount] = useGlobalState('connectedAccount')
    const [modal] = useGlobalState('showmodal')
    const [nft] = useGlobalState('nft')

    const handleBuy = async () => {
        setGlobalState('showmodal', 'scale-0')
        setGlobalState('loading', {
          show: true,
          msg: 'Initializing NFT transfer...',
        })
    
        try {
          setLoadingmsg('Purchasing....')
          await buyNFT(nft)

          setAlert('Transfer completed...') 
          
          window.location.reload()
        } catch (error) {
          console.log('Error transfering NFT: ', error)
          setAlert('Purchase failed...', 'red')
        }
    }

    const closeModal = () => {
        
        setGlobalState('showmodal','scale-0')
      
    }
    const OnPriceChange = () => {
        setGlobalState('nft', nft)
        setGlobalState('showmodal','scale-0')
        setGlobalState('updatemodal','scale-100')
    }



  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <div className="flex flex-col" >
                <div className="flex justify-between items-center">
                {connectedAccount == nft?.owner ?(<p className="font-semibold text-gray-400 ">Change Price</p>) : (<p className="font-semibold text-gray-400 ">Buy NFT</p>)}
                    
                    <button type="button" className="border-0 bg-transparent focus:outline-none hover:bg-red-500" onClick={closeModal}>
                        <FaTimes className='text-white'/>
                    </button>
                </div>
                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 h-40 w-40 rounded-xl overflow-hidden '>
                        <img className='h-full w-full object-cover cursor-pointer' src={nft?.metadataURI} alt={nft?.title}/>
                    </div>
                </div>

                <div className='flex flex-col justify-start rounded-xl mt-5'>
                    <h4 className='text-white font-semibold w-0.5'>{nft?.title}</h4>
                    <p className='text-gray-300 text-s my-2'> 
                     {nft?.description}    
                    </p>   
                </div>
               
                

                <div className='flex justify-between items-center mt-3 text-white'>
                    <div className='flex justify-start items-center'>
                        <Identicon className=" rounded-full" string={nft?.owner} size={50}/>
                        <div className='flex flex-col justify-center items-start'>
                            <small className='text-white font-bold px-4'>Owner</small>
                            <small className='text-orange-300 font-semibold px-4'>{nft?.owner ? truncate(nft?.owner, 4,4,11) : ''}</small>
                        </div>
                    </div>

                    <div className='flex flex-col text-white'>
                        <small className='text-sm font-semibold'>Current Price</small>
                        <p className=' text-s font-bold'>{nft?.cost} ETH</p>
                    </div>
                </div>

                {connectedAccount == nft?.owner ? (<button className="flex justify-center items-center mt-5  p-2  w-full shadow-lg shadow-black text-white text-sm
                           bg-gradient-to-r from-fuchsia-600 to-pink-600  rounded-full px-1.5 py-2 " onClick={OnPriceChange}> Update Price </button>) : (<div className='flex justify-between items-center space-x-2'>
                           <button className="flex justify-center items-center mt-5  p-2 w-full shadow-lg shadow-black text-white text-sm 
                                 bg-gradient-to-r from-fuchsia-600 to-pink-600  rounded-full px-1.5 py-2 " onClick={handleBuy}> Buy Now </button>
       
                           
                       </div>)}

                

            </div>
        </div>
    </div>

  )
}

export default ShowNFT
