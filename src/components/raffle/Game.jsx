import React from 'react'
import RaffleCard from './RaffleCard'

function Game() {
  return (
    <main className='absolute w-screen h-screen left-0 top-0 flex justify-center items-center backdrop-blur-md'>
        
        <section className='w-[570px] h-[400px] flex flex-col items-center justify-center bg-raffle-gradient bg-black rounded-2xl'>
            <h2 className='font-readex-pro font-bold text-[32px] text-white'>Claim Your Daily Elixr</h2>
            <p className='text-[#D0AAFF] text-sm mt-2'>Test your luck to claim your pink slip!</p>
            <div className='flex gap-2 mt-6'>
                <RaffleCard/>
                {/* <RaffleCard/>
                <RaffleCard/> */}
            </div>

        </section>
    </main>
  )
}

export default Game