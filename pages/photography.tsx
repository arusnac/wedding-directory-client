import type { NextPage } from "next";
import styles from "../styles/Photography.module.scss";
import PhotographerCard from "../components/photographerCard";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";
import uuid from "react-uuid";
import { IPhotographer } from "../types";

let photographerList: IPhotographer[];

const Photography: NextPage = () => {
  const [photographers, setPhotographers] = useState<
    IPhotographer[] | undefined
  >();

  const [locationFilter, setLocationFilter] = useState<string>();

  useEffect(() => {
    axios.get("http://localhost:8080/photography/all").then((response) => {
      photographerList = response.data;
      setPhotographers(photographerList);
      console.log(response.data);
    });
  }, []);

  const filterPhotographers = (city: string) => {
    city !== "all"
      ? setPhotographers(
          photographerList?.filter(
            (photographers) =>
              photographers.city.toLowerCase() === city.toLowerCase()
          )
        )
      : setPhotographers(photographerList);
  };
  //https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80
  return (
    <>
      <div className={styles.container}>
        <Nav />
        <div className={styles.banner}>
          <div>
            <h1>PHOTOGRAPHY</h1>
            <p>
              Browse Oregon based wedding photographers. Optionally filter by
              city.
            </p>
          </div>
          <div className={styles.selectContainer}>
            <label>Filter by location</label>
            <select
              onChange={(event) => filterPhotographers(event.target.value)}
            >
              <option value="all">All</option>
              <option value="Portland">Portland</option>
              <option value="Salem">Salem</option>
              <option value="Tualatin">Tualatin</option>
              <option value="Oregon City">Oregon City</option>
            </select>

            <input type="submit" value="Submit" />
          </div>
        </div>

        <div className={styles.innerWrap}>
          {photographers &&
            photographers.map((photographer) => {
              return <PhotographerCard {...photographer} key={uuid()} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Photography;
