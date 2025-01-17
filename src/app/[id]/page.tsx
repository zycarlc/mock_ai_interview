import { DialogType } from '@/@types/dialog'
import Home from '@/components/Home'
import prisma from '@/modules/db'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const history = await prisma.chatHistory.findMany({
    where: {
      chatRoomId: id,
    },
    select: {
      message: true,
      sender: true,
      timestamp: true,
    },
    orderBy: {
      order: 'asc',
    },
  })

  const messages: DialogType[] = history.map(({ message, sender }) => ({
    message,
    role: sender as 'User' | 'Interviewer',
  }))

  return (
    <>
      <Home messages={messages} />
    </>
  )
}
