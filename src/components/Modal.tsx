/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  deleteMethod: (id: string) => void
  id: string
}
const Modal: React.FC<Props> = ({
  showModal,
  setShowModal,
  deleteMethod,
  id,
}) => {
  //   const [open, setOpen] = useState(false)

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setShowModal(false)
        }}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden  rounded-3xl bg-blue-600 px-4 pt-5 pb-4 text-left align-bottom text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="flex justify-between sm:flex sm:items-start">
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-extrabold  leading-6 "
                  >
                    Delete Note
                  </Dialog.Title>
                  <p className="text-sm ">
                    Are you sure you want to delete this note? You will not be
                    able to get this note back.
                  </p>
                </div>
                <button
                  type="button"
                  className=" h-10 w-10 flex-shrink-0 rounded-full bg-red-400 duration-500 ease-in-out hover:bg-red-500 "
                  onClick={() => setShowModal(false)}
                >
                  x
                </button>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-full   bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm duration-500 ease-in-out hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => deleteMethod(id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-full  bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm duration-500 ease-in-out hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
