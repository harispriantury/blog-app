"use client"
import Navbar from './components/home/Navbar'
import MenuBar from './components/home/MenuBar'
import Profile from './components/home/Profile'

export default function Home() {

  return (
    <div>
      <Navbar />
      <section id='main' className='grid grid-cols-12 mx-52 bg-white min-h-screen pt-20'>
        <section id='content' className='col-span-8 border-r flex flex-col gap-2 p-8'>
          <h1 className='text-4xl font-extrabold'>Haris Priantury</h1>
          <MenuBar />
        </section>
        <Profile />
      </section>
    </div>
  )
}

