import { IHandleClose } from "../types";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import styles from "./AddVendorModal.module.css";
import axios from "axios";
import { Typography, Button, CircularProgress } from "@mui/material";

const AddToGallery = ({ handleClose }: IHandleClose) => {
  const [loading, setLoading] = useState<boolean>();
  const [galleryId, setGalleryId] = useState<string>();

  const onDrop = useCallback((acceptedFiles: any) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    //setGalleryUrl(formData);

    axios
      .post(`http://localhost:8080/gallery/upload/66`, formData, {
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

  useEffect(() => {
    console.log(galleryId);
  }, [galleryId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div>
        <h4>Add Image To Gallery</h4>
        <Typography mt={2} variant="h5">
          Gallery ID
        </Typography>
        <input
          onChange={(event) => setGalleryId(event.target.value)}
          type="text"
        />
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
      </div>
    </>
  );
};

export default AddToGallery;
