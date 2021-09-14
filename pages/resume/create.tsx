import type { NextPage } from 'next'
import React from 'react';
import ResumeForm from '../../components/resume/form';

const Home: NextPage = () => {
    return (
        <div className="grid grid-cols-2">

            <div className="">
                <h1>Create Invoice</h1>
                <ResumeForm></ResumeForm>
            </div>

            <div className="">
                <h2>Preview</h2>
                <p>Your resume</p>
            </div>
        </div>
    )
}

export default Home
