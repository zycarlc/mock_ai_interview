import prisma from '@/modules/db'
import { whisper } from './Whisper'
import { DialogType } from '@/@types/dialog'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

export const uploadFile = async (blob: Blob, chatRoomId: string) => {
  // client side code
  // upload the file to the server
  const formData = new FormData()
  const timeStamp = new Date().getTime()
  formData.append('file', blob, `recording-${timeStamp}.mp3`)
  formData.append('chatRoomId', chatRoomId)
  const response = await fetch('/api/uploadMp3', {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()

  // return the transcript
  return data
}

export const loadSpeechToText = async (path: string) => {
  try {
    return await whisper(path)
  } catch (error) {
    console.error('Error transcribing audio:', error)
  }
}

export const requestLLM = async (history: DialogType[], chatRoomId: string) => {
  const formData = new FormData()
  formData.append('history', JSON.stringify(history))
  formData.append('chatRoomId', chatRoomId)
  try {
    const response = await fetch('/api/request-llm', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error requesting LLM:', error)
  }
}

export const handleMessage = async (chatRoomId: string, dialog: DialogType) => {
  //check if chatRoom exists
  const chatRoomExists = await prisma.chatRoom.findUnique({
    where: { id: chatRoomId },
  })

  if (!chatRoomExists) {
    //create a new chatRoom
    await prisma.chatRoom.create({
      data: { id: chatRoomId, name: dialog.message },
    })
    revalidatePath(`/${chatRoomId}`)
  } else {
    await prisma.chatRoom.upsert({
      where: { id: chatRoomId },
      update: { name: dialog.message, id: chatRoomId },
      create: { id: chatRoomId, name: dialog.message },
    })
  }

  await prisma.chatHistory.create({
    data: {
      id: uuidv4(),
      chat_room: { connect: { id: chatRoomId } },
      sender: dialog.role,
      message: dialog.message,
      timestamp: new Date(),
    },
  })
}
