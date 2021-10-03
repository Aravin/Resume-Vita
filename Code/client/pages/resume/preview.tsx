import type { NextPage } from 'next'
import Preview from '../../components/preview/preview';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const PreviewPage: NextPage = () => {

  if (document) {
    console.log(document.querySelector('#preview')?.cloneNode(true));
  }

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
