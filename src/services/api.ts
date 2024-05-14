import type { GnomeType, GnomeTypeResponse } from '../components/common.types'

type APIResponse = {
    Brastlewark: Array<GnomeType>;
    };
    
const APIURL = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';

//al tener 2 funciones en la segunda función emulo un endpoint by ID, ya que la API no lo tiene

const getDataFromApi= () => {
 try {
    return fetch(APIURL)
        .then(response => {
            return response.json()
        })
        .then((data: APIResponse) => {

            if(!data){return null}

            const cleanData: GnomeTypeResponse[] = data.Brastlewark.map((gnome: GnomeType) => {
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
 } catch (error) {
    throw Error("There was an error on request or process data")
 }
    
};


const getDataByIdFromApi = async (id: number) => {
try {
    const allGnomes = await getDataFromApi()

    if (!allGnomes){return null}

    const gnome = allGnomes.find((gnome) => gnome.id === id)

    return gnome
} catch (error) {
    throw Error("There was an error on request or process data")
}

    
};

export { getDataFromApi, getDataByIdFromApi }