import type { NextPage } from 'next'
import React from 'react';
import ResumeForm from '../../components/resume/Form';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Loader from '../../components/Loader';

const CreateResume: NextPage = () => {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">

        <h2>Edit Resume</h2>
        <ResumeForm></ResumeForm>

      </div>
    </div>
  )
}

export default CreateResume

export const getServerSideProps = withPageAuthRequired();
