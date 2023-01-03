import { Bars3Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

interface TNavigationElementT {
  name: string
  href: string
}
const navigation: Array<TNavigationElementT> = [
  { name: 'Notes', href: '/notes' },
]
const HeaderV2 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: sessionData } = useSession()
  return (
    <nav className="mx-auto w-full max-w-7xl py-4 px-6 lg:px-8">
      <div
        className={` ${
          mobileMenuOpen ? ' rounded-3xl sm:rounded-full' : ' rounded-full'
        }  items-center justify-between  bg-blue-200 p-4 sm:flex sm:flex-row`}
      >
        <div
          className={` ${
            mobileMenuOpen ? 'pb-4 sm:pb-0' : 'pb-0'
          } flex w-full items-center justify-between pb-4 sm:pb-0`}
        >
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/images/profileLogo.png"
                alt="logo"
                width={50}
                height={50}
              ></Image>
            </Link>
          </div>
          <div className="mr-4 sm:hidden ">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          className={`${
            mobileMenuOpen ? ' ' : 'hidden sm:flex'
          } flex flex-col gap-4 sm:mr-8  sm:flex-row  `}
        >
          {navigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className=" flex-shrink-0 rounded-3xl bg-blue-400 py-2 px-8 text-center text-2xl font-extrabold text-white hover:bg-blue-600 "
              >
                {item.name}
              </Link>
            )
          })}
          <Link
            href={sessionData ? 'api/auth/signout' : 'api/auth/signin'}
            className=" flex-shrink-0 rounded-3xl bg-blue-400 py-2 px-8 text-center text-2xl font-extrabold text-white hover:bg-blue-600 "
          >
            {sessionData ? 'Sign-out' : 'Sign-in'}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default HeaderV2
