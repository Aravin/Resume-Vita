import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CallToAction from '../components/feature/CallToAction'
import Features from '../components/feature/Feature'
import FeaturesList from '../components/feature/FeatureList'

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-white">
        <div className="flex-col hero-content lg:flex-row">
          <div className="sm:hidden lg:block max-w-md">
            <Image src="/resume_undraw.svg" alt="Resume Vita Hero Image" width={600} height={600} />
          </div>
          <div>
            <h1 className="mb-5 text-5xl font-bold">
              Resume Vita (Beta)
            </h1>
            <p className="mb-5">
              Generate a resume, download as PDF, download as Word and share directly to your friends or recruiter. This is free and open source service.
            </p>
            <button className="btn btn-primary">
              <Link href="/resume">Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      <Features />
      <FeaturesList />
      <CallToAction />

    </>
  )
}

export default Home
