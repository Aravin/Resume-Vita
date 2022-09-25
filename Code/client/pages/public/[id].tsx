import type { NextPage } from 'next'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import React, { useRef, useState } from 'react';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';

const PreviewPage: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;
  const path = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}/${id}.pdf`;

  return (
    <div className='top-0 left-0 bottom-0 right-0 absolute'>
      <object className='w-full h-screen'
        data={path}
        type="application/pdf"
      ></object>
    </div>
  )
}

export default PreviewPage
