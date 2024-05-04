import styled from "styled-components";
import LoadingState from "../../../LoadingState";
import { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { getDataByIdFromApi } from "../../../../services/api";

import { GnomeTypeResponse } from "../../../common.types";
import { colors, fonts } from "../../../../styles/variables";

const Card = styled.div`
  background-color: ${colors.clarireForest};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${colors.darkForest};

  @media all and (min-width: 1024px) {
    width: 60%;
    margin: 50px auto;
  }
`;

const IconExit = styled.i`
  font-size: 1rem;
  color: ${colors.darkCoffee};
  background-color: ${colors.claireWood};
  border-radius: 100%;
  @media all and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Article = styled.article`
  @media all and (min-width: 768px) {
    display: flex;
  }

  img {
    width: 250px;
    display: block;
    margin: 0 auto;
    @media all and (min-width: 1024px) {
      width: 300px;
      margin: 0 5%;
    }
  }
`;

const Text = styled.section`
  color: ${colors.darkForest};
  font-family: ${fonts.petrona};
  font-size: 1rem;
  padding-left: 10px;
  @media all and (min-width: 768px) {
    font-size: 1.1rem;
    max-width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media all and (min-width: 1024px) {
    font-size: 1.3rem;
    padding-right: 20px;
  }
`;

const DivFriend = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const IconFriend = styled.i`
  font-size: 1.2rem;
  color: ${colors.claireBrownRed};

  &:hover {
    cursor: pointer;
  }
  @media all and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const TextFriend = styled.p`
  font-size: 1rem;
  color: ${colors.brownRed};
  @media all and (min-width: 768px) {
    font-size: 1.1rem;
  }
  @media all and (min-width: 1024px) {
    font-size: 1.3rem;
  }
`;

const TextError = styled.div`
  p {
    font-size: 1rem;
    color: ${colors.brownRed};
    font-family: ${fonts.petrona};
    text-align: center;
    @media all and (min-width: 768px) {
      font-size: 1.1rem;
    }
    @media all and (min-width: 1024px) {
      font-size: 1.3rem;
    }
  }
`;

function GnomeDetail() {
  const [gnome, setGnome] = useState<GnomeTypeResponse | null>();
  const [isLoading, setIsLoading] = useState(true);

  //friends
  const [isFriend, setIsFriend] = useState(false);
  const [newFriendText, setNewFriendText] = useState(
    "We are not friends, Do you want to be one?"
  );
  const [newFriendIconText, setNewFriendIconText] = useState("fa-regular");

  const manageFriend = () => {
    setIsFriend(!isFriend);

    if (!isFriend) {
      setNewFriendText("Now we are friends");
      setNewFriendIconText("fa-solid");
    } else {
      setNewFriendText("We are not friends, Do you want to be one?");
      setNewFriendIconText("fa-regular");
    }
  };

  const { pathname } = useLocation(); //pathname es la propiedad de la info de la ruta, hacemos destructuring

  const getIdFromURL = () => {
    const routeData = matchPath("/gnome/:idGnome", pathname);

    //PASO 2 sacamos el id del usuario
    const idGnome = routeData?.params.idGnome; // ? means: validate object before accesing, equivalent to a && a.b.c

    return Number(idGnome); // pasa el valor a numero
  };

  const setGnomeFromApi = async () => {
    const id = getIdFromURL();

    const gnomeFromApi = await getDataByIdFromApi(id);

    setGnome(gnomeFromApi);

    setIsLoading(false);
  };

  useEffect(() => {
    setGnomeFromApi();
  }, []);

  return isLoading ? (
    <LoadingState />
  ) : gnome ? (
    <Card>
      <Link to={`/`}>
        <IconExit
          data-testid="exit-icon"
          className="fa-regular fa-circle-xmark"
        ></IconExit>
      </Link>

      <Article data-testid="gnome-card">
        <img src={gnome.image} alt={gnome.name} />
        <Text>
          <p>
            <b>Name: </b>
            {gnome.name}
          </p>
          <p>
            <b>Age: </b>
            {gnome.age}
          </p>
          <p>
            <b>Hair Color: </b>
            {gnome.hairColor}
          </p>
          <p>
            <b>Works as: </b>
            {gnome.job.length ? gnome.job.join(", ") : "Nothing"}
          </p>
          <p>
            <b>Friends: </b>
            {gnome.friends.length ? gnome.friends.join(", ") : "Nobody"}
          </p>
          <DivFriend>
            <TextFriend>{newFriendText}</TextFriend>
            <IconFriend
              data-testid="icon-heart"
              className={`${newFriendIconText} fa-heart`}
              onClick={manageFriend}
            ></IconFriend>
          </DivFriend>
        </Text>
      </Article>
    </Card>
  ) : (
    <TextError data-testid="gnome-message-error">
      <p>NO GNOME FOUND</p>
    </TextError>
  );
}

export default GnomeDetail;
