const client = require('../modules/db-seed.ts')
const { interviewQuestionsAndAnswer } = require('../app/lib/data.js')
const { log } = require('console')

async function seedInterviewQuestionAndAnswer(client) {
  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    // Create the "InterviewQuestionAndAnswer" table if it doesn't exist
    const createTable = await client.query(`
        CREATE TABLE IF NOT EXISTS interview_question_and_answer (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    `)

    console.log(`Created "interview_question_and_answer" table`)
    const insertedQnA = await Promise.all(
      interviewQuestionsAndAnswer.map((pair) =>
        client.query(`
          INSERT INTO interview_question_and_answer (question, answer)
          VALUES ('${pair.question}', '${pair.answer}')
          ON CONFLICT (id) DO NOTHING;
        `),
      ),
    )
    console.log(
      `Successfully seeded ${insertedQnA.length} Interview Questions and Answers`,
    )
    return {
      createTable,
      insertedQnA,
    }
  } catch (error) {
    console.error('Error seeding Interview Questions and Answers', error)
  }
}

async function main() {
  await client.connect()

  await seedInterviewQuestionAndAnswer(client)

  await client.end()
}

// main().catch((error) => {
//   console.error('Error seeding data', error)
// })
