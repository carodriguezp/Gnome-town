type GnomeType = {
    id: number,
    name: string,
    thumbnail: string,
    age: number,
    hair_color: string,
    professions: string[],
    friends: Array<string>
}

type GnomeTypeResponse = {
    id: number,
    name: string,
    image: string,
    age: number,
    hairColor: string,
    job: string[],
    friends: Array<string>
}

export type { GnomeType, GnomeTypeResponse }