import type { NextPage } from 'next'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import { FaFilePdf, FaFileWord, FaEdit } from 'react-icons/fa';

const ResumePage: NextPage = () => {

  const { user, error, isLoading } = useUser();


  const handleClick = (e: any) => {
    e.preventDefault();

    var link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_API_BASE_PATH}${user?.sub?.split('|')[1]}.pdf`;
    link.download = `${process.env.NEXT_PUBLIC_API_BASE_PATH}${user?.sub?.split('|')[1]}.pdf`;
    link.target = '_blank';
    link.dispatchEvent(new MouseEvent('click'));
  }

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 lg:w-3/5">

        <div className="flex justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Resume Dashboard</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 my-5">
          <div data-tip="Edit Resume" className="tooltip tooltip-bottom">
            <Link href="/resume/create" passHref>
              <Image className="cursor-pointer hover:opacity-50 hover:tooltip" src={`${process.env.NEXT_PUBLIC_API_BASE_PATH}${user?.sub?.split('|')[1]}.png`} width="240" height="300" alt="PDF Preview"></Image>
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-bold">Your Resume</h3>
            <div className="mt-4">
              <Link href="/resume/create" passHref>
                <button className="btn btn-outline btn-primary"><FaEdit /> &nbsp;Edit Resume</button>
              </Link>
            </div>
            <div className="mt-4">

              <button className="btn btn-outline btn-accent" onClick={handleClick}><FaFilePdf /> &nbsp;Download Resume</button>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResumePage

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/resume'
});
