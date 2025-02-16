'use server'
import { createReadStream } from 'fs'
import { AzureOpenAI } from 'openai'

// You will need to set these environment variables or edit the following values
const endpoint = process.env['AZURE_OPENAI_ENDPOINT'] || '<endpoint>'
const apiKey = process.env['AZURE_OPENAI_API_KEY'] || '<api key>'

// Required Azure OpenAI deployment name and API version
const apiVersion = '2024-08-01-preview'
const deploymentName = 'whisper'

function getClient(): AzureOpenAI {
  return new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment: deploymentName,
  })
}

export async function whisper(
  audioFilePath: string,
): Promise<{ text: string }> {
  const client = getClient()
  const result = await client.audio.transcriptions.create({
    model: '',
    file: createReadStream(audioFilePath),
  })
  console.log(result)

  return result
}
