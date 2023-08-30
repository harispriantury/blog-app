"use client"
import supabase from '@/supabase/supabase'
import Image from 'next/image'
import Navbar from './components/home/Navbar'
import CustomButton from './components/CustomButton'
import MenuBar from './components/home/MenuBar'
import Profile from './components/home/Profile'

export default function Home() {
  const test = async () => {
    console.log('supabase', supabase)
    try {
      let { data } = await supabase
        .from('categories')
        .select('*')

      if (data) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />
      <section id='main' className='grid grid-cols-12 mx-52 bg-white min-h-screen'>
        <section id='content' className='col-span-8 border-r flex flex-col gap-2 p-8'>
          <h1 className='text-3xl'>Haris Priantury</h1>
          <MenuBar />
        </section>
        <Profile />
      </section>
    </div>
  )
}
