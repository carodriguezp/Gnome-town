import { GnomeTypeResponse } from "../common.types";

export const mockdGnomeList: GnomeTypeResponse[] = [{
    id: 1 ,
    name: "Gnome 0" ,
    image: "image 0" ,
    age: 10 ,
    hairColor: "red" ,
    job:[ "trabajo ","trabajo 2" ], 
    friends: ["friend 1", "friend 2"]
},
{
    id: 2 ,
    name: "Gnome 1" ,
    image: "image 1" ,
    age: 10 ,
    hairColor: "red" ,
    job:[ "trabajo 2" ],
    friends: ["friend 1", "friend 2", "friend 3"]
}

];

export const mockdGnome: GnomeTypeResponse = mockdGnomeList[0]

