import type { NextPage } from "next";
import styles from "../styles/Photography.module.css";
import PhotographerCard from "../components/photographerCard";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";
import uuid from "react-uuid";
import { IPhotographer } from "../types";

const Photography: NextPage = () => {
  const [photographers, setPhotographers] = useState<
    IPhotographer[] | undefined
  >();

  useEffect(() => {
    axios.get("http://localhost:8080/photography/all").then((response) => {
      setPhotographers(response.data);
      console.log(response.data);
    });
  }, []);
  //https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80
  return (
    <>
      <div className={styles.container}>
        <Nav />
        <div className={styles.banner}>
          <h1>PHOTOGRAPHY</h1>
          <p>
            Browse Oregon based wedding photographers. Optionally filter by
            city.
          </p>
        </div>

        <div className={styles.innerWrap}>
          <div className={styles.selectContainer}>
            <label>Filter by location:</label>
            <select name="cars" id="cars">
              <option value="volvo">Portland</option>
              <option value="saab">Salem</option>
              <option value="opel">Tualatin</option>
              <option value="audi">Vancouver</option>
            </select>

            <input type="submit" value="Submit" />
          </div>
          {photographers &&
            photographers.map((photographer) => {
              return (
                <PhotographerCard
                  city={photographer.city}
                  state={photographer.state}
                  key={uuid()}
                  website={photographer.website}
                  name={photographer.name}
                  email={photographer.email}
                  bio={photographer.bio}
                  galleries={photographer.galleries}
                  featured={photographer.featured}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Photography;
