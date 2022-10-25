import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { IGallery } from "../types/index";
import Image from "next/image";
import next from "next";
import uuid from "react-uuid";
import { IPhotographer } from "../types";
import styles from "./PhotographyCard.module.css";

const PhotographerCard: FunctionComponent<IPhotographer> = ({
  name,
  email,
  galleries,
  bio,
  website,
  featured,
  city,
  state,
}) => {
  const [images, setImages] = useState<string[] | undefined>();
  useEffect(() => {
    axios.get("http://localhost:8080/gallery/29").then((response) => {
      console.log(response.data.imageUrls);
      setImages(response.data.imageUrls);
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div>
          <Image
            width="250"
            height="250"
            alt="featured image"
            src={`http://localhost:8080/photography/download/32`}
          />
        </div>
        <div className={styles.textContent}>
          <div className={styles.header}>
            <h1>{name}</h1>
            <h2>{city}</h2>
          </div>
          <div className={styles.content}>
            <h1>{bio}</h1>
          </div>
          <div className={styles.cardFooter}>
            <h1>{website}</h1>
            <h1>{email}</h1>
          </div>
        </div>

        {/* {images &&
            images.map((image) => {
              return (
                <Image
                  loader={myLoader}
                  width="250"
                  height="250"
                  alt="photos"
                  src={`https://images.unsplash.com/photo-${featured}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80`}
                  key={uuid()}
                />
              );
            })} */}
      </div>
    </>
  );
};

export default PhotographerCard;
