import type { NextPage } from 'next'
import Head from 'next/head'
import InvoiceForm from './../../components/invoice/form'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className="flex">

            <div className="flex-1">
            <h1>Create Invoice</h1>
            <InvoiceForm></InvoiceForm>
            </div>

            <div className="flex-1">
            </div>
        </div>
    )
}

export default Home
