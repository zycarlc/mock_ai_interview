import prisma from '@/modules/db'
import Home from '../components/Home'
import { DialogType } from '@/@types/dialog'

export default async function Page() {
  const questions = await prisma.interviewQuestionAndAnswer.findMany()

  const randomeQuestion =
    questions[Math.floor(Math.random() * questions.length)].question
  const formattedQuestion: DialogType = {
    message: randomeQuestion,
    role: 'Interviewer',
  }
  return (
    <>
      <Home messages={[formattedQuestion]} />
    </>
  )
}
