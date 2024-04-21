import React from 'react';
import { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { getDataByIdFromApi } from '../../../services/api';
import LoadingState from '../../LoadingState';
import { GnomeTypeResponse } from '../../common.types';

function GnomeDetail() {

    const [gnome, setGnome] = useState<GnomeTypeResponse>();
    const [isLoading, setIsLoading] = useState(true);

    //para la logica de friends
    const [isFriend, setIsFriend] = useState(false);
    const [newFriendText, setNewFriendText] = useState("We are not friends, Do you want to be one?");
    const [newFriendIconText, setNewFriendIconText] = useState("fa-heart-crack")


    const manageFriend = () => {
        setIsFriend(!isFriend)

        if (!isFriend) {
            setNewFriendText("Now we are friends")
            setNewFriendIconText("fa-heart")
        } else {
            setNewFriendText("We are not friends, Do you want to be one?")
            setNewFriendIconText("fa-heart-crack")
        }
    }


    const { pathname } = useLocation(); //pathname es la propiedad de la info de la ruta, hacemos destructuring

    const getIdFromURL = () => {
        {/*RUTAS PATH DETAIL */ }

        const routeData = matchPath("/gnome/:idGnome", pathname)

        //PASO 2 sacamos el id del usuario
        const idGnome = routeData?.params.idGnome; // ? means: validate object before accesing, equivalent to a && a.b.c

        return Number(idGnome) // pasa el valor a numero
    }

    const setGnomeFromApi = async () => {

        const id = getIdFromURL();

        const gnomeFromApi = await getDataByIdFromApi(id)

        console.log(gnomeFromApi)

        setGnome(gnomeFromApi)

        setIsLoading(false)
    }



    useEffect(() => {
        setGnomeFromApi()
    }, [])

    return (
        isLoading ? <LoadingState /> : (gnome ?
            <div className="" >

                <Link to={`/`} >
                    <i className="fa-solid fa-square-xmark"></i>
                </Link>

                <div className="">

                    <img className="" src={gnome.image} alt={gnome.name} />
                    <section className="">
                        <p>Name: {gnome.name}</p>
                        <p>Age: {gnome.age}</p>
                        <p>Hair Color: {gnome.hairColor}</p>
                        <p>Works as: {gnome.job.length ? gnome.job.join(", ") : "Nothing"}</p>
                        <p>Friends: {gnome.friends.length ? gnome.friends.join(", ") : "Nobody"}</p>
                        <div>
                            <p>{newFriendText}</p>
                            <i className={`fa-solid ${newFriendIconText}`} onClick={manageFriend}></i>
                        </div>

                    </section>
                </div>
            </div>
            : <div><p>NO GNOME FOUND</p></div>)
    )
}

export default GnomeDetail

