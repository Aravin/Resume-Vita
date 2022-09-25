import type { NextPage } from 'next'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import { FaFilePdf, FaEdit } from 'react-icons/fa';
import { AiFillFileAdd, AiFillEdit } from 'react-icons/ai';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';

const ResumePage: NextPage = () => {

  const { user, error, isLoading } = useUser();
  const userId = user?.sub?.split('|')[1];

  // fetch hook
  const { data, loading, fetchError } = useFetch(process.env.NEXT_PUBLIC_API + `/resume/${userId}`);

  if (isLoading || loading) return <div><Loader /></div>;
  if (error) return <div>{error.message}</div>;
  if (loading) return <div><Loader /></div>;
  // if (fetchError) return <div>Failed to load the PDF, please retry!</div>

  const handleClick = (e: any) => {
    e.preventDefault();

    var a = document.createElement('a');
    a.href = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
    // link.download = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.pdf`;
    a.dispatchEvent(new MouseEvent('click'));
  }

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 lg:w-3/5">

        <div className="flex justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Resume Dashboard</h2>
          </div>
        </div>

        {
          data === '' &&
          <div className="flex-row my-5 mx-2">
            <div className="mt-5">
              No Resume Added!, click on below image to create new Resume...
            </div>
            <div data-tip="Create Resume" className="tooltip tooltip-bottom">
              <Link href="/resume/create" passHref>
                <a>
                  <AiFillFileAdd className="h-24 w-24 m-4 text-primary cursor-pointer hover:opacity-50 hover:tooltip" />
                </a>
              </Link>
            </div>
          </div>
        }

        {
          data !== '' &&
          <div className="grid grid-cols-3 my-5 mx-2">
            {
              data.isPDFGenerated &&

              <div data-tip="Preview Resume" className="tooltip tooltip-bottom">
                <Link href="/resume/preview" passHref>
                  <a>
                    <Image className="cursor-pointer hover:opacity-50 hover:tooltip" src={`${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/${userId}.webp`} width="240" height="300" alt="PDF Preview" />
                  </a>
                </Link>
              </div>
            }

            {
              !(data.isPDFGenerated) &&

              <div className="flex-row my-5 mx-2">
                <div className="mt-5">
                  PDF not generated!, click on edit image and generate PDF...
                </div>
                <div data-tip="Create Resume" className="tooltip tooltip-bottom">
                  <Link href="/resume/create" passHref>
                    <a>
                      <AiFillEdit className="h-24 w-24 m-4 text-primary cursor-pointer hover:opacity-50 hover:tooltip" />
                    </a>
                  </Link>
                </div>
              </div>
            }

            <div>
              <h3 className="text-xl font-bold">Your Resume</h3>
              <div className="mt-4">
                <Link href="/resume/create" passHref>
                  <button className="btn btn-outline btn-primary"><FaEdit /> &nbsp;Edit Resume</button>
                </Link>
              </div>
              {
                data.isPDFGenerated &&

                <>
                  <div className="mt-4">
                    <button className="btn btn-outline btn-accent" onClick={handleClick}><FaFilePdf /> &nbsp;Download Resume</button>
                  </div>

                  <div className="mt-4">
                    <a className="btn btn-outline btn-secondary" href={`/public/${userId}`} target={'_blank'} rel={'noreferrer'} ><FaFilePdf /> &nbsp;Open Public Resume</a>
                  </div>

                  <br />
                  <div>
                    Public Link:
                  </div>
                  <div className="badge badge-primary">https://www.resumevita.com/public/{userId}</div>

                </>
              }

            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default ResumePage

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/resume'
});
