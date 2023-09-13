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