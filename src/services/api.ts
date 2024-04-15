import type { GnomeType, GnomeTypeResponse } from '../components/common.types'

const getDataFromApi = () => {

    return fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
        .then(response => {
            return response.json()
        })
        .then((data) => {

            const cleanData: GnomeTypeResponse[] = data["Brastlewark"].map((gnome: GnomeType) => {
                return {
                    id: gnome.id,
                    name: gnome.name,
                    image: gnome.thumbnail,
                    age: gnome.age,
                    hairColor: gnome.hair_color,
                    job: gnome.professions,
                    friends: gnome.friends
                }
            });

            return cleanData
        });
};

getDataFromApi()

const getDataByIdFromApi = (id: number) => {

    return fetch(`https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json/${id}`)
        .then(response => response.json())
        .then((gnome) => {
            return {
                id: gnome.id,
                name: gnome.name,
                image: gnome.thumbnail,
                age: gnome.age,
                hair_color: gnome.hair_color,
                job: gnome.professions,
                friends: gnome.friends
            };
        });

};

export { getDataFromApi, getDataByIdFromApi }