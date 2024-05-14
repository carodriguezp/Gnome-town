type Gnome ={
    id: number,
    name: string,
    age: number,
    friends: Array<string>
}

type GnomeType = {
    thumbnail: string,
        hair_color: string,
    professions: string[],
   } & Gnome

type GnomeTypeResponse = { 
    image: string,
        hairColor: string,
    job: string[],
   } & Gnome

export type { GnomeType, GnomeTypeResponse }