'use server'

import prisma from '@/modules/db'
import { revalidatePath } from 'next/cache'

export const deleteChatRoom = async (id: string) => {
  console.log(`deleting chatRoom with id: ${id}`)

  try {
    await prisma.$transaction(async (prisma) => {
      return [
        await prisma.chatHistory.deleteMany({
          where: {
            chatRoomId: id,
          },
        }),
        await prisma.chatRoom.delete({
          where: {
            id,
          },
        }),
      ]
    })
    revalidatePath('/')
  } catch (e) {
    console.error('Error deleting chatRoom:', e)
  }
}
