'use client'
import React, { useState } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import Button from './Button'
import { uploadFile } from '@/app/lib/utils'
import { useDialogConext } from '@/components/Home'

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

const AudioRecorder: React.FC<{ chatRoomId: string }> = ({ chatRoomId }) => {
  const { dialog, setDialog } = useDialogConext()
  const [recordedUrl, setRecordedUrl] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const startRecording = async () => {
    try {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true)
        })
        .catch((e) => console.error(e))
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setRecordedUrl(blobURL)
        setIsRecording(false)
        return blob
      })
      .then((blob) => {
        return uploadFile(blob, chatRoomId)
      })
      .then((result) => {
        setDialog([
          ...dialog,
          {
            role: 'User',
            message: result.transcript.text,
          },
        ])
      })
      .catch((e) => console.log(e))
  }

  return (
    <div>
      {recordedUrl && <audio controls src={recordedUrl} />}
      {isRecording ? (
        <Button
          className="rounded-full bg-red-200 px-4 py-2 shadow-md"
          onClick={stopRecording}
        >
          Stop Recording
        </Button>
      ) : (
        <Button
          className="rounded-full bg-sky-200 px-4 py-2 shadow-md"
          onClick={startRecording}
        >
          Start Recording
        </Button>
      )}
    </div>
  )
}
export default AudioRecorder
