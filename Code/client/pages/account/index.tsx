import type { NextPage } from 'next'
import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const AccountPage: NextPage = () => {

  const { user, error, isLoading } = useUser();

  return (
    <>
    </>
  )
}

export default AccountPage

export const getServerSideProps = withPageAuthRequired();
