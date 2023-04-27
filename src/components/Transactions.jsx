import { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import { useGlobalState, truncate } from '../store'

const Transactions = () => {

    const [transactions] = useGlobalState('transactions')
    const [end, setEnd] = useState(3)
    const [count] = useState(3)
    const [collection, setCollection] = useState([])
  
    const getCollection = () => {
      return transactions.slice(0, end)
    }
  
    useEffect(() => {
      setCollection(getCollection())
    }, [transactions, end])


  return (
    <div className="bg-[#a1afc0]">
        <div className="w-4/5 py-10 mx-auto">
            <h4 className="text-white text-3xl font-bold  uppercase text-gradient">{collection.length > 0 ? 'Latest Transactions' : 'No Transaction Yet'}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gaps-4 lg:gaps-3 py-2.5">
                {collection.map((tx, i) => (
                 <Transaction key={i} tx={tx} />
               ))}
            </div>
            <div className='text-center my-6'>
               <button className="shadow-lg shadow-black text-white text-sm bg-[#23911f] hover:bg-[#145310] rounded-full px-1.5 py-1 "
                onClick={()=> setEnd(end + count)}
                >Load More</button>
            </div>
               
        </div>


    </div>
  )

}

const Transaction = ({tx}) => (
    <div className="flex justify-between items-center border border-green-400 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
        <div className='rounded-md shadow-sm shadow-green-500 p-2'>
            <BiTransfer/>
        </div>
        <div>
            <h4 className='text-sm'>ETH Transfered</h4>
            <small className='flex justify-start items-center'>
                <span className='mr-1'>Received by</span>
                <a className="text-green-400 mr-2 underline-onhover" href="#" target="_blank">{truncate(tx.owner,6,3,11)}</a>
                <MdOpenInNew className='cursor-pointer'/>
            </small>
        </div>

        <p className='text-sm font-medium'>{(tx.cost)} ETH</p>
    </div>

)

export default Transactions