import React from 'react'
import logo from '../assets/logo.png'
import { connectWallet } from '../Blockchain.services'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className='w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img className='w-32 cursor-pointer' src={logo} alt='CryptGoNFTs-Logo' />
      </div>

      <ul className='md:flex-[0.5] text-white md:flex hidden list-none justify-between items-center flex-initial'>
        <li className='mx-4 cursor-pointer'>Market</li>
        <li className='mx-4 cursor-pointer'>Artists</li>
        <li className='mx-4 cursor-pointer'>Features</li>
        <li className='mx-4 cursor-pointer'>Community</li>
      </ul>

      {connectedAccount ? (
        <button className='shadow-xl shadow-black text-white bg-[#116a1f] hover:bg-[#29e335] md:text-xs   p-2 rounded-full font-semibold'  >
        {truncate(connectedAccount, 4,4,11)}
        </button>
      ): (
        <button className='shadow-xl shadow-black text-white mx-7  glow-on-hover md:text-s p-2 rounded-full' onClick={connectWallet} >
        Connect Wallet
        </button>
      )}

     
      
    </div>
  )
}

export default Header