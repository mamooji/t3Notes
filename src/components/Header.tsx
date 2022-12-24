import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
interface TNavigationElementT {
  name: string
  href: string
}

const navigation: Array<TNavigationElementT> = [
  { name: 'Notes', href: '/notes' },
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: sessionData } = useSession()

  return (
    <div className="isolate ">
      <div className=" mx-auto max-w-7xl ">
        <div className=" px-8 py-4">
          <div className=" rounded-full  bg-blue-500 px-6 py-4 lg:px-8">
            <div>
              <nav
                className="flex h-9 items-center justify-between"
                aria-label="Global"
              >
                <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <Image
                      src="/images/profileLogo.png"
                      alt="logo"
                      width={50}
                      height={50}
                    ></Image>
                  </Link>
                </div>
                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="rounded-3xl bg-blue-400 py-2 px-8 text-2xl font-extrabold text-white hover:bg-blue-600 "
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                  <button
                    className="  rounded-3xl bg-blue-400 py-2 px-8 text-2xl font-extrabold text-white "
                    onClick={sessionData ? () => signOut() : () => signIn()}
                  >
                    {sessionData ? 'Sign out' : 'Sign in'}
                  </button>
                </div>
              </nav>
              <Dialog
                as="div"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
              >
                <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                  <div className="flex h-9 items-center justify-between">
                    <div className="flex">
                      <Link href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                      </Link>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="py-6">
                        <Link
                          href={
                            sessionData
                              ? '/api/auth/signout'
                              : '/api/auth/signin'
                          }
                          className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                        >
                          {sessionData ? 'Sign out' : 'Sign in'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
