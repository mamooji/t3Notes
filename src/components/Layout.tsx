import Head from 'next/head'
import React, { Fragment } from 'react'
import Footer from './Footer'
import Header from './Header'
import Script from 'next/script'

interface Props {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Create T3 Note App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-MQYGZEGFKM"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-MQYGZEGFKM');`}
      </Script>

      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <main className=" mx-auto w-full flex-1 sm:max-w-7xl ">{children}</main>
        <Footer />
      </div>
    </Fragment>
  )
}

export default Layout
