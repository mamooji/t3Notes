import Link from 'next/link'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <div className="relative mx-6 mb-4 rounded-3xl  bg-blue-600 px-6  text-white  lg:mx-8 lg:px-8">
      <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
        <div>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative overflow-hidden rounded-full bg-blue-400 py-1.5 px-4 text-sm leading-6 duration-500 ease-in-out hover:bg-blue-500">
              <span className=" font-extrabold">
                Check out the Repo.{' '}
                <Link
                  href="https://github.com/mamooji/t3Notes"
                  className="font-extrabold text-indigo-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Here <span aria-hidden="true">&rarr;</span>
                </Link>
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-center  text-6xl font-extrabold ">
              T3{' '}
              <div className="inline-block -skew-y-6 transform bg-orange-400 p-2">
                <p className=" skew-y-6 transform">Notes</p>
              </div>{' '}
              App
            </h1>
            <p className="text-extrabold mt-6 text-center text-lg leading-8 ">
              Created using the T3 stack, enjoy!
            </p>
            <div className="mt-8 flex justify-center gap-x-4">
              <Link
                href="#"
                className="inline-block rounded-lg bg-orange-400 px-4 py-1.5 text-base font-extrabold leading-7 text-white duration-500 ease-in-out hover:bg-orange-500"
              >
                Create a Note
                <span className="text-indigo-200" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
              <Link
                href="#"
                className="inline-block rounded-lg bg-blue-400 px-4 py-1.5 font-extrabold leading-7 duration-500 ease-in-out hover:bg-blue-500"
              >
                My Notes
                <span className="" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
