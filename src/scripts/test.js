// import { PrismaClient } from '@prisma/client'

const { PrismaClient } = require('@prisma/client')
const interviewQuestionAndAnswer = require('../app/lib/data.js')

const prisma = new PrismaClient()

async function main() {
  // await prisma.chatRoom.deleteMany()
  // interviewQuestionAndAnswer.forEach(async (pair) => {
  //   await prisma.interviewQuestionAndAnswer.create({
  //     data: {
  //       question: pair.question,
  //       answer: pair.answer,
  //     },
  //   })
  // })
  // return 'Successfully seeded Interview Questions and Answers'
  //   const questions = await prisma.interviewQuestionAndAnswer.findMany({
  //     select: { question: true },
  //   })
  // console.log(questions)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
