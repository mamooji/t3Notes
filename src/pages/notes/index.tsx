import React from 'react'
import CreateNote from '../../components/Notes/CreateNote'
import Layout from '../../components/Layout'
import { type NextPage } from 'next'

const notes: NextPage = () => {
  return (
    <Layout>
      <CreateNote />
    </Layout>
  )
}

export default notes
