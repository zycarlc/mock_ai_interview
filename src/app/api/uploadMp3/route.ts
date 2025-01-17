import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { loadSpeechToText } from '@/app/lib/utils'
import { handleMessage } from '@/app/lib/utils'

export async function POST(req: Request) {
  //sever side code
  const formData = await req.formData()
  const file = formData.get('file') as File
  const chatRoomId = formData.get('chatRoomId') as string
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  try {
    await writeFile(
      path.join(process.cwd(), 'public/assets/' + file.name),
      buffer,
    )
    const transcript = await loadSpeechToText(
      path.join(process.cwd(), 'public/assets/' + file.name),
    )
    if (chatRoomId !== '') {
      //load transcript to the database
      await handleMessage(chatRoomId, {
        role: 'User',
        message: transcript?.text || '',
      })
    }
    return NextResponse.json({ transcript })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ status: 'fail', error: e })
  }
}
