import type { NextPage } from 'next'
import React from 'react';
import Preview from '../../components/preview/preview';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { FaFilePdf, FaFileWord, FaEdit } from 'react-icons/fa';

const PreviewPage: NextPage = () => {

  const { user, error, isLoading } = useUser();

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 lg:w-3/5">

        <div className="flex justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Preview Resume</h2>
          </div>
          <div className="flex-1">
            <div className="flex justify-around">
              <div className="flex-1"><button className="btn btn-outline btn-accent"><FaFilePdf/> GET PDF</button> </div>
              <div className="flex-1"><button className="btn btn-outline btn-secondary"><FaFileWord /> GET Word</button> </div>
              <div className="flex-1"><button className="btn btn-outline btn-primary"><FaEdit/> Edit</button></div>
            </div>
          </div>
        </div>
        <Preview></Preview>

      </div>
    </div>
  )
}

export default PreviewPage

export const getServerSideProps = withPageAuthRequired();
