import type { NextPage } from 'next'
import React from 'react';
import ResumeForm from '../../components/resume/Form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const CreateResume: NextPage = () => {

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
