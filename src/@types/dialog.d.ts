export type DialogType = {
  role: 'Interviewer' | 'User'
  message: string
}

export type DialogContextType = {
  dialog: DialogType[]
  setDialog: (c: DialogType[]) => void
}
