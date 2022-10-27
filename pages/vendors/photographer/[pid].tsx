import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPhotographer } from "../../../types";
import styles from "../../../styles/Photography.module.css";
import Nav from "../../../components/nav";
import Link from "next/link";
import { url } from "inspector";
import Image from "next/image";
import image1 from "../../../img/test1.jpg";
import image2 from "../../../img/test2.jpg";
import image3 from "../../../img/test3.jpg";
import image4 from "../../../img/test4.jpg";

const Photographer = () => {
  const [photographer, setPhotographer] = useState<IPhotographer>();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/photography/photographer/${pid}`)
      .then((response) => {
        setPhotographer(response.data);
        console.log(response.data);
      });
  }, []);

  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <div className={styles.container}>
        <Nav />
        <div className={styles.banner}></div>
        <div className={styles.innerWrapPhotographer}>
          <div className={styles.header}>
            <h1>{photographer?.name}</h1>
            <h4>
              {photographer?.city}, {photographer?.state}
            </h4>
            <Link href={"#"}>Website</Link> | <Link href={"#"}>Email</Link>
          </div>

          <div className={styles.bio}>
            <h3>About</h3>
            <h4>Subtitle</h4>
            <p>{photographer?.bio}</p>
          </div>

          <div className={styles.bio}>
            <h3>Additional Details</h3>
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
          <p>View Gallery</p>
          <div className={styles.galleryPreview}>
            <Image src={image1} width="250" height="400" alt="wedding photo" />
            <Image src={image2} width="250" height="400" alt="wedding photo" />
            <Image src={image3} width="250" height="400" alt="wedding photo" />
            <Image src={image4} width="250" height="400" alt="wedding photo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Photographer;
