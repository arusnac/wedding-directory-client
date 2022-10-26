import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, CircularProgress } from "@mui/material";
import styles from "./AddVendorModal.module.css";
import ImageIcon from "@mui/icons-material/Image";
let vendorUpdateId: string;

const AddVendor = ({ handleClose }: any) => {
  const [vendorType, setVendorType] = useState<string>();
  const [vendorName, setVendorName] = useState<string>();
  const [vendorEmail, setVendorEmail] = useState<string>();
  const [vendorWebsite, setVendorWebsite] = useState<string>();
  const [vendorBio, setVendorBio] = useState<string>();
  const [vendorLocation, setVendorLocation] = useState<string>();
  const [vendorFeatured, setVendorFeatured] = useState<FormData>();
  const [nextPage, setNextPage] = useState<Boolean>(false);
  const [loading, setLoading] = useState(false);
  const [vendorId, setVendorId] = useState<string>();
  const [vendorIdUpdate, setvendorIdUpdate] = useState<string>();

  //Change the form on state change
  const [formType, setFormType] = useState<string>("add");

  const onDrop = useCallback((acceptedFiles: any) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    setVendorFeatured(formData);
    console.log(vendorUpdateId);
    const userId = 32;

    axios
      .post(
        `http://localhost:8080/photography/upload/${vendorUpdateId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => console.log("File Uploaded Successfully"))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    console.log(file);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const setVendorCategory = (category: string) => {
    console.log(category);
  };

  const submit = () => {
    axios
      .post(
        `http://localhost:8080/photography/add`,
        {},
        {
          params: {
            name: vendorName,
            bio: vendorBio,
            category: vendorType,
            email: vendorEmail,
            city: vendorLocation,
            state: "OR",
            website: vendorWebsite,
          },
        }
      )
      .then((response) => (vendorUpdateId = response.data.id))
      .then(() => setNextPage(true))
      .catch((err) => console.log(err));
    // .finally(() => {
    //   setLoading(false);
    // });

    console.log(
      vendorType +
        " Name: " +
        vendorName +
        " " +
        vendorEmail +
        " " +
        vendorBio +
        " " +
        " " +
        vendorWebsite +
        " " +
        vendorLocation +
        " " +
        vendorFeatured
    );
  };

  const update = () => {
    if (vendorIdUpdate) {
      console.log(vendorIdUpdate);
      //setVendorId(vendorIdUpdate);
      vendorUpdateId = vendorIdUpdate;
      axios
        .put(`http://localhost:8080/photography/update/${vendorIdUpdate}`, {
          name: vendorName,
          bio: vendorBio,
          category: vendorType,
          email: vendorEmail,
          city: vendorLocation,
          state: "OR",
          website: vendorWebsite,
        })
        .then(() => setNextPage(true))
        .catch((err) => console.log(err));
    }
  };

  const getPhotographer = () => {
    axios
      .get(`http://localhost:8080/photography/photographer/${vendorIdUpdate}`)
      .then((response) => {
        setVendorName(response.data.name);
        setVendorEmail(response.data.email);
        setVendorBio(response.data.bio);
        setVendorLocation(response.data.city);
        setVendorType(response.data.category);
        setVendorWebsite(response.data.website);
      });
  };

  return (
    <>
      {nextPage && (
        <div className={styles.modalForm}>
          <h1>Upload A Featured Image</h1>
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
        </div>
      )}
      {!nextPage && (
        <div className={styles.modalForm}>
          <div>
            <Typography mt={2} variant="h4">
              Add Vendor
            </Typography>
          </div>
          <div className={styles.inputLine}>
            <label>Add</label>
            <input
              type="radio"
              id="javascript"
              name="fav_language"
              value="add"
              defaultChecked
              onChange={(event) => setFormType(event.target.value)}
            />
            <label>Update</label>
            <input
              type="radio"
              id="javascript"
              name="fav_language"
              value="update"
              onChange={(event) => setFormType(event.target.value)}
            />
            {/* <Typography>Add/Update</Typography>
            <select
              id="location"
              onChange={(event) => setFormType(event.target.value)}
            >
              <option value="add">Add</option>
              <option value="update">Update</option>
            </select> */}
            {formType === "update" && (
              <>
                <Typography>Vendor ID</Typography>
                <input
                  onChange={(event) => setvendorIdUpdate(event.target.value)}
                  type="text"
                ></input>
                <div>
                  <button onClick={getPhotographer}>Get Photographer</button>
                </div>
              </>
            )}
            <div>
              <Typography>Vendor Type</Typography>
              <Typography>{vendorType}</Typography>
              <select
                id="location"
                onChange={(event) => setVendorType(event.target.value)}
                value={vendorType}
              >
                <option value=""></option>
                <option value="Photographer">Photographer</option>
                <option value="Venue">Venue</option>
                <option value="Caterer">Caterer</option>
                <option value="Florist">Florist</option>
              </select>
            </div>
            <Typography>Vendor Name</Typography>
            <input
              onChange={(event) => setVendorName(event.target.value)}
              type="text"
              value={vendorName}
            ></input>
            <Typography>Email</Typography>
            <input
              onChange={(event) => setVendorEmail(event.target.value)}
              type="text"
              value={vendorEmail}
            ></input>
            <Typography>Website</Typography>
            <input
              onChange={(event) => setVendorWebsite(event.target.value)}
              type="text"
              value={vendorWebsite}
            ></input>
            <Typography>Bio</Typography>
            <textarea
              onChange={(event) => setVendorBio(event.target.value)}
              rows={4}
              value={vendorBio}
            ></textarea>
            <div>
              <Typography>Location</Typography>
              <select
                onChange={(event) => setVendorLocation(event.target.value)}
                value={vendorLocation}
              >
                <option value=""></option>
                <option value="Portland">Portland</option>
                <option value="Salem">Salem</option>
                <option value="Tualatin">Tualatin</option>
                <option value="Oregon City">Oregon City</option>
              </select>
            </div>
          </div>
          {/* <Typography>Featured Image</Typography>
          <div className={styles.uploadArea}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop image here, or click to select file.</p>
              )}
            </div>
          </div> */}
          <div className={styles.formFooter}>
            {formType === "add" ? (
              <button onClick={submit}>Save and Continue</button>
            ) : (
              <button onClick={update}>Update and Continue</button>
            )}
            <button onClick={() => handleClose()}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVendor;
