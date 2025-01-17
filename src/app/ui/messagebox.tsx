import clsx from 'clsx'
import { DialogType } from '@/@types/dialog'

export const MessageBox = ({ role, message }: DialogType) => {
  return (
    <div>
      <p
        className={clsx`text-lg font-semibold ${
          role === 'User' && 'text-right'
        }`}
      >
        {role + ':'}
      </p>
      <div className="flex">
        {role === 'User' && <div className="min-w-12"></div>}
        <div
          className={clsx`text-normal shadow-md p-2 rounded-lg ${
            role === 'User' ? 'text-right' : 'bg-sky-200/50'
          }`}
        >
          <p>{message}</p>
        </div>
        {role === 'Interviewer' && <div className="min-w-12"></div>}
      </div>
    </div>
  )
}
