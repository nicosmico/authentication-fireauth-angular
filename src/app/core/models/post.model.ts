export interface Post{
    type: string,
    age: number,
    name: string | null,
    region: number,
    comuna: string,
    mainPhoto: string,
    photos: string[] | null,
    description: string,
    sterilized: boolean,
    chip: boolean,
    userEmail: string
}