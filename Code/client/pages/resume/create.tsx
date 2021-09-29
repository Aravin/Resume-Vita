import type { NextPage } from 'next'
import React from 'react';
import Preview from '../../components/preview/preview';
import ResumeForm from '../../components/resume/form';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {

  const { user, error, isLoading } = useUser();

  return (
    <div className="flex justify-center">
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">

        <h2>Edit Resume</h2>
        <ResumeForm></ResumeForm>

      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = withPageAuthRequired();
