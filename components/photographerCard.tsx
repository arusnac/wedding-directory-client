import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { IGallery } from "../types/index";
import Image from "next/image";
import next from "next";
import uuid from "react-uuid";
import { IPhotographer } from "../types";
import styles from "./PhotographyCard.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, IconButton } from "@mui/material";

const PhotographerCard: FunctionComponent<IPhotographer> = ({
  name,
  email,
  galleries,
  bio,
  website,
  featured,
  city,
  state,
  id,
}) => {
  // const [images, setImages] = useState<string[] | undefined>();
  // useEffect(() => {
  //   axios.get("http://localhost:8080/gallery/find/32").then((response) => {
  //     console.log(response.data.imageUrls);
  //     setImages(response.data.imageUrls);
  //   });
  // }, []);

  const [hover, onHover] = useState<Boolean>(false);

  const router = useRouter();

  return (
    <>
      <div
        className={styles.container}
        onClick={() => router.push(`/vendors/photographer/${id}`)}
        onMouseOver={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        style={{
          backgroundImage: `url(http://localhost:8080/photography/download/${id})`,
        }}
      >
        {/* <div
          className={styles.imgContainer}
          style={{
            backgroundImage: `url(http://localhost:8080/photography/download/${id})`,
          }}
        >
          <Image
            width="400"
            height="250"
            alt="featured image"
            src={`http://localhost:8080/photography/download/${id}`}
          />
        </div> */}
        <div className={styles.price}>
          <Typography variant="h4">$2000-$5000</Typography>
        </div>
        <div className={!hover ? styles.textContent : styles.textContentHover}>
          {!hover ? (
            <>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="h6">{city}</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">View More</Typography>
              <ArrowForwardIosIcon
                className={styles.arrow}
                sx={{ paddingTop: "5px" }}
              />
            </>
          )}

          {/* <div className={styles.content}>
            <p>{bio}</p>
          </div>
          <div className={styles.cardFooter}>
            <h1>{website}</h1>
            <h1>{email}</h1>
          </div> */}
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
