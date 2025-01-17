import { NextResponse } from 'next/server'
import { ChatBot } from '@/app/lib/ChatBot'
import { DialogType } from '@/@types/dialog'
import prisma from '@/modules/db'
import { v4 as uuidv4 } from 'uuid'
import { handleMessage } from '@/app/lib/utils'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  // Get all questions from the database
  const questions = await prisma.interviewQuestionAndAnswer
    .findMany({
      select: { question: true },
    })
    .then((questions) => questions.map((question) => question.question))

  // Get the history from the request
  const formData = await req.formData()
  let history = formData.get('history')
  let chatRoomId = formData.get('chatRoomId') as string
  const chatBot = new ChatBot()
  if (history === null) {
    // Handle the case where history is null
    return NextResponse.error()
  }

  const messageHistory: DialogType[] = JSON.parse(history as string)

  if (chatRoomId === '') {
    chatRoomId = uuidv4()
    for (const dialog of messageHistory) {
      await handleMessage(chatRoomId, dialog)
    }
    console.log('new chatroom created, chatRoomId:', chatRoomId)
  }

  // generate AI response
  const response = await chatBot.run({
    messageHistory,
    topic: 'Node.js',
    questionsList: questions,
  })
  // save the response to the database
  await handleMessage(chatRoomId, { role: 'Interviewer', message: response })

  // redirect(`/${chatRoomId}`)

  return NextResponse.json({ response, chatRoomId })
}
