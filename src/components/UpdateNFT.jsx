import { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import boredapestrid from '../assets/bored-apes-trid.jpg'
import { setAlert, setGlobalState, setLoadingmsg, useGlobalState } from '../store'
import { updateNFT } from '../Blockchain.services'

const UpdateNFT = () => {

    const [modal] = useGlobalState('updatemodal');
    const [nft] = useGlobalState('nft');
    const [price , setPrice] = useState(nft?.cost);
    


    // const [title , setTitle] = useState('');
    // const [description ,setDescription] = useState('');
    // const [fileUrl , setFileUrl] = useState('');
    // const [imgBase64 , setImgBase64] = useState('');
    
    

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!price || price <= 0 ) return

        setGlobalState('modal', 'scale-0')
        setLoadingmsg('Updating the price...')

        try {
          setLoadingmsg('In Progress...')  
          setGlobalState('updatemodal', 'scale-0')
          await updateNFT({id: nft.id, cost : price})
          setAlert('Price Updated', 'green')
          window.location.reload()
        } catch (error) {
            console.log('Error updating price', error)
            setAlert('Failed to Change the Price', 'red')
        }

        closeModal()
    }

    const closeModal = () => {
        
        setGlobalState('updatemodal','scale-0')
        resetForm()
    }

    const resetForm = () => {
       
        setPrice('')
        
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-400 ">Make an Offer</p>
                    <button type="button" className="border-0 bg-transparent focus:outline-none hover:bg-red-500" onClick={closeModal}>
                        <FaTimes className='text-white'/>
                    </button>
                </div>
                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 h-20 w-20 rounded-xl overflow-hidden '>
                        <img className='h-full w-full object-cover cursor-pointer' src={boredapestrid} alt="nft"/>
                    </div>
                </div>
                

                

                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                   
                   <input 
                     type="number"  className='block w-full text-sm text-slate-300 focus:outline-none 
                     cursor-pointer focus:ring-0 bg-transparent border-0'
                     placeholder='Price (ETH)' 
                     min={0.01} 
                     step={0.01} 
                     name='price' 
                     required
                     onChange={(e) => setPrice(e.target.value)} 
                     value={price}
                     
                    />
               
                </div>

                

                <button className="flex justify-center items-center mt-5  p-2  shadow-lg shadow-black text-white
                 text-sm bg-[#e32970] hover:bg-[#bd255f] rounded-full px-1.5 py-2" onClick={handleSubmit}> Update Price </button>

            </form>
        </div>
    </div>

  )
}

export default UpdateNFT