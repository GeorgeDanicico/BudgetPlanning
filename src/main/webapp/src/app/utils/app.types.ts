export interface ILoginResponse  {
    username: string,
    email: string,
    sessionId: string
}

export interface INoteData {
    title: string,
    description: string,
    isEditMode: boolean,
}

export interface NoteResponse {
    id: string,
    title: string,
    description: string,
}

export interface NotesResponse {
    notes: NoteResponse[]
}