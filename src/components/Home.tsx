'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import AudioRecorder from '../components/AudioRecorder'
import { DialogType, DialogContextType } from '../@types/dialog'
import { requestLLM } from '@/app/lib/utils'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { MessageBox } from '@/app/ui/messagebox'

export const DialogContext = createContext<DialogContextType>({
  dialog: [],
  setDialog: () => {},
})

export const useDialogConext = () => useContext(DialogContext)

export default function Home({ messages }: { messages: DialogType[] }) {
  const [dialog, setDialog] = useState<DialogType[]>(messages)
  const [isWatingLLM, setIsWatingLLM] = useState<boolean>(false)
  const router = useRouter()

  const chatRoomId = usePathname().slice(1)

  useEffect(() => {
    if (dialog[dialog.length - 1].role === 'User') {
      setIsWatingLLM(true)
      // fetch the response from the server
      requestLLM(dialog, chatRoomId).then((response) => {
        if (chatRoomId === '') {
          // redirect(`/${response.chatRoomId}`)
          router.push(`/${response.chatRoomId}`)
        } else {
          setDialog([
            ...dialog,
            {
              role: 'Interviewer',
              message: response.response,
            },
          ])
        }
      })
    } else {
      setIsWatingLLM(false)
    }
  }, [dialog, chatRoomId, router])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DialogContext.Provider
          value={{
            dialog,
            setDialog,
          }}
        >
          <ul className="font-[family-name:var(--font-geist-mono)]">
            {dialog.map((item, index) => {
              return (
                <li className="mb-2" key={index}>
                  <MessageBox role={item.role} message={item.message} />
                </li>
              )
            })}
          </ul>
          <div className="w-full flex flex-row-reverse">
            {isWatingLLM ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
                disabled
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </button>
            ) : (
              <AudioRecorder chatRoomId={chatRoomId} />
            )}
          </div>
        </DialogContext.Provider>
      </main>
    </div>
  )
}
