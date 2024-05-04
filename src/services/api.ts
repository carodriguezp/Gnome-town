import type { GnomeType, GnomeTypeResponse } from '../components/common.types'

const getDataFromApi= () => {

    return fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
        .then(response => {
            return response.json()
        })
        .then((data) => {

            if(!data){return null}

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


const getDataByIdFromApi = async (id: number) => {

    const allGnomes = await getDataFromApi()

    if (!allGnomes){return null}

    const gnome = allGnomes.find((gnome) => gnome.id === id)

    return gnome
};

export { getDataFromApi, getDataByIdFromApi }