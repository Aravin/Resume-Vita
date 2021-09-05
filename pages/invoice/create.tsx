import type { NextPage } from 'next'
import Head from 'next/head'
import InvoiceForm from './../../components/invoice/form'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <>
            <h1>Create Invoice</h1>
            <InvoiceForm></InvoiceForm>
        </>
    )
}

export default Home
