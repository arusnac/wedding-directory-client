import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { IGallery, IPhotographer } from "../../../types";
import styles from "../../../styles/Photography.module.scss";
import Nav from "../../../components/nav";
import Link from "next/link";
import Image from "next/image";
import uuid from "react-uuid";
import { Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { promises } from "stream";
import ViewGallery from "../../../components/ViewGallery";
import AddVendorModal from "../../../components/AddVendorModal";
import styled from "styled-components";

const gallerySample: string[] = new Array();

const Photographer = () => {
  const [photographer, setPhotographer] = useState<IPhotographer>();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const pid = router.query.pid as string;
      //getPhotographer(pid);
      axios
        .get(
          `http://localhost:8080/photography/photographer/${router.query.pid}`
        )
        .then((response) => {
          setPhotographer(response.data);
          console.log("PHOTO" + response.data);
        });

      axios
        .get(`http://localhost:8080/gallery/find/${pid}`)
        .then((response) => {
          console.log(response.data);
          setImages(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady]);

  const [images, setImages] = useState<IGallery>();
  const [sampleImages, setSampleImages] = useState<String[]>();

  const [open, setGalleryOpen] = useState<Boolean>(false);
  const setOpen = () => setGalleryOpen(true);
  const setClosed = () => setGalleryOpen(false);
  const toggleModal = () => {
    setGalleryOpen(!open);
    window.scrollTo(0, 0);
  };

  async function getGalleryImages(pid: String) {
    await axios
      .get(`http://localhost:8080/gallery/find/${pid}`)
      .then((response) => {
        console.log(response.data);
        setImages(response.data);
      })
      .then(() => {
        //console.log("IMAGES FROM GETGALLERY " + images?.imageUrls);
        //setSampleGallery();
      })
      .finally(() => {});
  }

  useEffect(() => {
    console.log("USE EFFECT    " + gallerySample);
    if (images != undefined) {
      if (images.imageUrls.length != undefined && sampleImages == undefined) {
        //gallerySample = [];
        setSampleImages([]);
        //setSampleImages([...gallerySample]);
        if (images.imageUrls?.length > 4) {
          for (let i = 0; i < 4; i++) {
            gallerySample[i] = images.imageUrls[i];
          }
        } else {
          for (let i = 0; i < images.imageUrls.length; i++) {
            console.log(i);
            gallerySample[i] = images.imageUrls[i];
          }
        }
        setSampleImages([...gallerySample]);
      }
    }

    console.log("IMAGES FROM GETGALLERY " + images);
  }, [images, sampleImages]);

  return (
    <>
      <div className={styles.container}>
        <Nav />
        <div className={styles.bannerPhotographer}></div>
        <div className={styles.innerWrapPhotographer}>
          <div className={styles.photographerContainer}>
            <div className={styles.textArea}>
              <div className={styles.header}>
                <Typography variant="h3">{photographer?.name}</Typography>

                <Typography variant="h5">
                  {photographer?.city}, {photographer?.state}
                </Typography>
              </div>

              <div className={styles.bio}>
                <Typography variant="h4">About</Typography>
                <Typography variant="h5">Subtitle</Typography>
                <div>
                  <Typography variant="h6">{photographer?.bio}</Typography>
                </div>
              </div>
            </div>

            <div className={styles.info}>
              <Typography variant="h6">Website</Typography>
              <Link href={"#"}>
                <a>
                  {photographer?.website
                    ? photographer.website
                    : "www.placeholder.com"}
                </a>
              </Link>
              <Typography variant="h6">Email</Typography>
              <Link href={"#"}>
                <a>
                  {photographer?.email
                    ? photographer.email
                    : "placeholderemail@gmail.com"}
                </a>
              </Link>
              <Typography variant="h6">Socials</Typography>
              <div>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className={styles.bio}>
            <Typography variant="h4">Additional Details</Typography>
            <div className={styles.additionalDetails}>
              <div className={styles.additionalDetailsItem}>
                <h5>Services</h5>
                <ul>
                  <li>Weddings</li>
                  <li>Portraits</li>
                </ul>
              </div>
              <div className={styles.additionalDetailsItem}>
                <h5>Style</h5>
                <ul>
                  <li>IDK</li>
                  <li>Some Style</li>
                </ul>
              </div>
            </div>
          </div>
          {images && (
            <Button onClick={() => toggleModal()}>
              <strong>View Gallery</strong>
            </Button>
          )}
          <div className={styles.galleryPreview}>
            {/* {images} */}
            {sampleImages?.map((image) => {
              return (
                <Image
                  onClick={() => toggleModal()}
                  key={uuid()}
                  src={`https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${images?.id}/${image}`}
                  width="250"
                  height="400"
                  alt="wedding photo"
                />
              );
            })}
            {images && open && (
              <AddVendorModal modalType={"gallery"}>
                <ViewGallery
                  id={images.id}
                  title={images.title}
                  description={images.description}
                  imageUrls={images.imageUrls}
                  vendorId={images.vendorId}
                  handleClose={setClosed}
                />
              </AddVendorModal>
            )}
            {/* <Image
              src={`https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${galleryItem.id}/${url}`}
              width="250"
              height="400"
              alt="wedding photo"
            /> */}
            {/* <Image src={image2} width="250" height="400" alt="wedding photo" />
            <Image src={image3} width="250" height="400" alt="wedding photo" />
            <Image src={image4} width="250" height="400" alt="wedding photo" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

const Button = styled.button`
  background-color: transparent;
  color: black;
  border-right: none;
  border-bottom: solid 1px rgb(202, 202, 202);
  border-top: solid 1px rgb(202, 202, 202);
  font-size: 20px;
  text-decoration: strong;
  border-left: none;
  border-radius: 0;
  &:hover {
    color: #595959;
  }
`;

export default Photographer;
