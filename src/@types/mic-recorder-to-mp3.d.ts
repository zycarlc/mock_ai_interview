declare module 'mic-recorder-to-mp3' {
  export interface MicRecorderOptions {
    bitRate?: number
    startRecordingAt?: number
    deviceId?: null | string
  }

  export default class MicRecorder {
    config: MicRecorderConfig
    activeStream: MediaStream | null
    context: AudioContext | null
    microphone: MediaStreamAudioSourceNode | null
    processor: ScriptProcessorNode | null
    lameEncoder: LameEncoder | null // Replace LameEncoder with the actual type if known

    constructor(config?: MicRecorderConfig)

    addMicrophoneListener(stream: MediaStream): void
    stop(): this
    start(): Promise<MediaStream>
    getMp3(): Promise<[Uint8Array, Blob]>
  }
}
