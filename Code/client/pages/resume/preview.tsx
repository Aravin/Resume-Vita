import type { NextPage } from 'next'
import Preview from '../../components/preview/Preview';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';
import Loader from '../../components/Loader';

const PreviewPage: NextPage = () => {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 lg:w-3/5">

        <div className="flex justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Preview Resume</h2>
          </div>
        </div>
        <Preview></Preview>

      </div>
    </div>
  )
}

export default PreviewPage

export const getServerSideProps = withPageAuthRequired();
