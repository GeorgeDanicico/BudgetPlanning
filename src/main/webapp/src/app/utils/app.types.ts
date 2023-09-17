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

export interface Note {
    id: number,
    title: string,
    description: string,
}

export interface NotesResponse {
    notes: Note[]
}

export interface AddNoteResponse {
    status: number,
    message: string,
    note: Note,
}