import { RunnableSequence } from '@langchain/core/runnables'
import { ChatOpenAI } from '@langchain/openai'
import { PrismaClient } from '@prisma/client'
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessage,
} from '@langchain/core/messages'
import { DialogType } from '@/@types/dialog'
import { StringOutputParser } from '@langchain/core/output_parsers'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'

export class ChatBot {
  model: ChatOpenAI // Declare the 'model' property
  promptTemplate: ChatPromptTemplate

  constructor() {
    // find all questions from the database
    this.model = new ChatOpenAI({
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiInstanceName:
        process.env.AZURE_OPENAI_API_INSTANCE_NAME_QUIZ,
      azureOpenAIApiDeploymentName: 'gpt-4o-mini',
      azureOpenAIApiVersion: '2024-08-01-preview',
      model: 'gpt-4o-mini',
      temperature: 0,
    })
    this.promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        'I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the software engineer position with tech skills for {topic}. I want you to only reply as the interviewer. Only reply with English. Do not write all of the conversations at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Tell me how my answer is and give explanations. Ask me the questions one by one like an interviewer does and wait for my answer. Below are the questions you can ask me: {questions}',
      ],
      new MessagesPlaceholder('msgs'),
    ])
  }

  async run({
    messageHistory,
    topic,
    questionsList,
  }: {
    messageHistory: DialogType[]
    topic: string
    questionsList: string[]
  }) {
    let chain = this.promptTemplate
      .pipe(this.model)
      .pipe(new StringOutputParser())
    let newMessageHistory = messageHistory.map(({ role, message }) => {
      if (role === 'Interviewer') {
        return new AIMessage({ content: message })
      }
      return new HumanMessage({ content: message })
    })
    let messages = newMessageHistory
    let questions = questionsList.join('\n')

    return await chain.invoke({
      topic,
      questions,
      msgs: messages,
    })
  }
}
