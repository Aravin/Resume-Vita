import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img src="/resume_undraw.svg" className="max-w-md" />
          <div>
          <h1 className="mb-5 text-5xl font-bold">
          Resume Tree
          </h1>
          <p className="mb-5">
          Generate a resume, download as PDF, download as Word and share directly to your friends or recruiter. This is free and open source service. 
          </p>
          <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      
    </>
  )
}

export default Home
