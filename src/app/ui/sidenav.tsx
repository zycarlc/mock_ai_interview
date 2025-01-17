import Link from 'next/link'
import NavLink from './nav-link'
import prisma from '@/modules/db'
import { unstable_noStore as noStore } from 'next/cache'
import { DeleteChatRoom } from './buttons'

export default async function SideNav() {
  noStore()
  const links = await fetchChatRooms()

  return links.length === 0 ? null : (
    <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-20"
          href="/"
        >
          <div className="w-32 text-white md:w-40">
            <h1 className="font-bold">New Chat</h1>
          </div>
        </Link>
        <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          {links.length === 0
            ? null
            : links.map((link) => (
                <div
                  className={
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
                  }
                  key={link.id}
                >
                  <NavLink name={link.name} id={link.id} />
                  <div className="hidden h-auto grow rounded-md bg-gray-50 md:block"></div>
                  <DeleteChatRoom id={link.id} />
                </div>
              ))}

          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
    </div>
  )
}

async function fetchChatRooms() {
  noStore()
  return await prisma.chatRoom.findMany({
    select: { id: true, name: true },
  })
}
