import type { NextPage } from 'next'
import React from 'react';
import ResumeForm from '../../components/resume/Form';

const Home: NextPage = () => {
    return (
        <div className="flex">

            <div className="flex-1">
                <h1>Create Invoice</h1>
                <ResumeForm></ResumeForm>
            </div>

            <div className="flex-1">
            </div>
        </div>
    )
}

export default Home
