import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button } from "@mui/material";
import styles from "./AddVendorModal.module.css";

const AddVendor = ({ open }: any) => {
  const [vendorType, setVendorType] = useState<string>();
  const [vendorName, setVendorName] = useState<string>();
  const [vendorEmail, setVendorEmail] = useState<string>();
  const [vendorWebsite, setVendorWebsite] = useState<string>();
  const [vendorBio, setVendorBio] = useState<string>();
  const [vendorLocation, setVendorLocation] = useState<string>();
  const [vendorFeatured, setVendorFeatured] = useState<string>();

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    const userId = 32;

    axios
      .post(`http://localhost:8080/photography/upload/32`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => console.log("File Uploaded Successfully"))
      .catch((err) => console.log(err));

    console.log(file);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const setVendorCategory = (category: string) => {
    console.log(category);
  };

  const submit = () => {
    console.log(vendorType + " Name: " + vendorName);
  };

  return (
    <>
      <div className={styles.modalForm}>
        <div>
          <Typography mt={2} variant="h4">
            Add Vendor
          </Typography>
        </div>
        <div className={styles.inputLine}>
          <div>
            <Typography>Vendor Type</Typography>
            <Typography>{vendorType}</Typography>
            <select
              id="location"
              onChange={(event) => setVendorType(event.target.value)}
            >
              <option value=""></option>
              <option value="photographer">Photographer</option>
              <option value="venue">Venue</option>
              <option value="caterer">Caterer</option>
              <option value="florist">Florist</option>
            </select>
          </div>
          <Typography>Vendor Name</Typography>
          <input
            onChange={(event) => setVendorName(event.target.value)}
            type="text"
          ></input>
          <Typography>Email</Typography>
          <input
            onChange={(event) => setVendorEmail(event.target.value)}
            type="text"
          ></input>
          <Typography>Website</Typography>
          <input
            onChange={(event) => setVendorWebsite(event.target.value)}
            type="text"
          ></input>
          <Typography>Bio</Typography>
          <textarea
            onChange={(event) => setVendorBio(event.target.value)}
            rows={4}
          ></textarea>
          <div>
            <Typography>Location</Typography>
            <select onChange={(event) => setVendorLocation(event.target.value)}>
              <option value=""></option>
              <option value="portland">Portland</option>
              <option value="salem">Salem</option>
              <option value="tualatin">Tualatin</option>
              <option value="vancouver">Vancouver</option>
            </select>
          </div>
        </div>
        <Typography>Featured Image</Typography>
        <div className={styles.uploadArea}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop image here, or click to select file.</p>
            )}
          </div>
        </div>
        <div className={styles.formFooter}>
          <button onClick={submit}>Save</button>
          <button onClick={() => open()}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddVendor;
