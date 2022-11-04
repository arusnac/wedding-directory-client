import { IGallery } from "../types";
import Image from "next/image";
import uuid from "react-uuid";
import styles from "./ViewGallery.module.scss";
import { url } from "inspector";
import { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IHandleClose } from "../types";

type galleryProps = {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  vendorId: string;
  handleClose: () => void;
};

let index: number = 0;
const ViewGallery = ({
  id,
  title,
  description,
  imageUrls,
  vendorId,
  handleClose,
}: galleryProps) => {
  const [currentImage, setCurrentImage] = useState<String>();

  useEffect(() => {
    setCurrentImage(imageUrls[0]);
  }, []);

  const toggleRight = () => {
    index < imageUrls.length - 1 ? (index += 1) : (index = 0);

    setCurrentImage(imageUrls[index]);
  };

  const toggleLeft = () => {
    index === 0 ? (index = imageUrls.length - 1) : (index -= 1);

    setCurrentImage(imageUrls[index]);
  };

  const clickToSetImage = (id: number) => {
    index = id;
    setCurrentImage(imageUrls[index]);
  };

  useEffect(() => {
    console.log(currentImage);
  }, [currentImage]);

  return (
    <>
      {/* <p>{props.title}</p>
      <p>{props.description}</p> */}
      <div className={styles.galleryContainer}>
        <div
          className={styles.mainImage}
          style={{
            backgroundImage: `url("https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${id}/${currentImage}")`,
          }}
        >
          {/* <Image
            key={uuid()}
            src={`https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${props.id}/${props.imageUrls[0]}`}
            width="100%"
            height="800"
            alt="wedding photo"
          /> */}
          <button className={styles.buttonLeft} onClick={() => toggleLeft()}>
            <ArrowBackIosIcon />
          </button>
          <button className={styles.buttonRight} onClick={() => toggleRight()}>
            <ArrowForwardIosIcon />
          </button>
          <button onClick={() => handleClose()} className={styles.buttonClose}>
            x
          </button>
        </div>
        <div className={styles.thumbnails}>
          {imageUrls.map((image) => {
            return (
              <div className={styles.imageHolder} key={uuid()}>
                <Image
                  key={imageUrls.indexOf(image)}
                  onClick={() => clickToSetImage(imageUrls.indexOf(image))}
                  src={`https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${id}/${image}`}
                  width="115px"
                  height="175px"
                  alt="wedding photo"
                  className={
                    index === imageUrls.indexOf(image)
                      ? styles.imageSelect
                      : styles.imageNotSelected
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewGallery;
