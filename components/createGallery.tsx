import { IHandleClose } from "../types";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import styles from "./AddVendorModal.module.css";
import axios from "axios";
import { Typography, Button, CircularProgress } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

let galleryId: string;

const CreateGallery = ({ handleClose }: IHandleClose) => {
  const [loading, setLoading] = useState<Boolean>();
  const [galleryUrl, setGalleryUrl] = useState<FormData>();
  //const [galleryId, setGalleryId] = useState<string>();
  const [nextPage, setNextPage] = useState<Boolean>(false);
  const [galleryTitle, setGalleryTitle] = useState<String>();
  const [galleryDescription, setGalleryDescription] = useState<String>();
  const [vendorId, setVendorId] = useState<String>();

  const onDrop = useCallback((acceptedFiles: any) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    setGalleryUrl(formData);

    axios
      .post(`http://localhost:8080/gallery/upload/${galleryId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => console.log("File Uploaded Successfully"))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    console.log(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const submit = () => {
    axios
      .post(
        `http://localhost:8080/gallery/add`,
        {},
        {
          params: {
            title: galleryTitle,
            description: galleryDescription,
            vendorId,
          },
        }
      )
      .then((response) => (galleryId = response.data.id))
      .then(() => {
        setNextPage(true);
        console.log(galleryId);
      })
      .catch((err) => console.log(err));
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  return (
    <>
      <div className={styles.modalForm}>
        {!nextPage && (
          <>
            <div>
              <Typography mt={2} variant="h4">
                Create Gallery
              </Typography>
            </div>
            <div className={styles.inputLine}>
              <Typography mt={2} variant="h5">
                Title
              </Typography>
              <input
                onChange={(event) => setGalleryTitle(event.target.value)}
                type="text"
              />
              <Typography mt={2} variant="h5">
                Description
              </Typography>
              <input
                onChange={(event) => setGalleryDescription(event.target.value)}
                type="text"
              />
              <Typography mt={2} variant="h5">
                Assign to Vendor
              </Typography>
              <input
                onChange={(event) => setVendorId(event.target.value)}
                type="text"
              />
            </div>
            <div className={styles.formFooter}>
              <button onClick={submit}>Save and Continue</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </>
        )}
        {nextPage && (
          <>
            <div>
              <Typography variant="h4">Add Photos</Typography>
            </div>
            <ImageIcon fontSize="large" />
            <div className={styles.uploadArea}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag and drop image here, or click to select file.</p>
                )}
              </div>
              {loading && <CircularProgress />}
            </div>
            <button onClick={() => handleClose()}>Save</button>
          </>
        )}
      </div>
    </>
  );
};

export default CreateGallery;
