import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/Admin.module.css";
import AddVendor from "../components/addPhotographer";
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import VendorModal from "../components/AddVendorModal";
import UpdateVendor from "../components/UpdateVendor";
import {
  Typography,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableHead,
  TableCell,
} from "@mui/material";
import CreateGallery from "../components/createGallery";
import { IGallery } from "../types";
import axios from "axios";
import DisplayData from "../components/admin/DisplayData";
import Image from "next/image";

export default function Admin() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [overlay, setOverlay] = useState<Boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);
  const [galleryList, setGalleryList] = useState<IGallery[]>();

  const handleOpen = () => setOverlay(true);
  const handleClose = () => setOverlay(false);

  const handleOpenAdd = () => {
    setOverlay(true);
    setAddOpen(true);
  };

  const handleCloseAdd = () => {
    setOverlay(false);
    setAddOpen(false);
  };

  const handleGalleryOpen = () => {
    setOverlay(true);
    setGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setOverlay(false);
    setGalleryOpen(false);
  };

  const getGalleries = () => {
    axios
      .get("http://localhost:8080/gallery/all")
      .then((response) => setGalleryList(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div
        className={overlay && styles.overlay}
        onClick={() => {
          setOverlay(false);
          setGalleryOpen(false);
          setAddOpen(false);
        }}
      ></div>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Nav />
        <div className={styles.title}>
          <Typography variant="h4">Admin Dashboard</Typography>
        </div>

        {!session && (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Example NextAuth Sign In
            </h2>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-1/2 mt-12 rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </>
        )}

        {session && (
          <>
            {/* <Typography variant="h4" component="h4">
              Welcome, {session?.user?.name ?? session?.user?.email}
            </Typography> */}
            <div className={styles.header}>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-1/2 mt-12 rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`,
                  })
                }
              >
                Sign Out
              </button>
            </div>
            <div className={styles.actionArea}>
              <h3>Actions</h3>
              <div className={styles.actionAreaInner}>
                <button onClick={() => handleOpenAdd()}>Add Vendor</button>
                <button onClick={() => handleGalleryOpen()}>
                  Create Gallery
                </button>
                <button onClick={getGalleries}>Get Galleries</button>
              </div>
            </div>
            {addOpen && (
              <VendorModal>
                <AddVendor handleClose={handleCloseAdd} />
              </VendorModal>
            )}
            {galleryOpen && (
              <VendorModal>
                <CreateGallery handleClose={handleGalleryClose} />
              </VendorModal>
            )}
            <div>
              {/* <DisplayData galleryList={galleryList} /> */}

              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="data table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Image URLS</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Image</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {galleryList?.map((gallery) => (
                        <TableRow key={gallery.id}>
                          <TableCell>{gallery.id}</TableCell>
                          <TableCell>{gallery.title}</TableCell>
                          <TableCell>{gallery.description}</TableCell>

                          <TableCell>
                            {gallery.imageUrls?.map((url) => {
                              return <p key={url}>{url}</p>;
                            })}
                          </TableCell>
                          <TableCell>{gallery.vendorId}</TableCell>
                          <TableCell>
                            {gallery.imageUrls?.map((url) => {
                              return (
                                <Image
                                  key={url}
                                  width="100"
                                  height="100"
                                  alt="vendor image"
                                  src={`https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${gallery.id}/${url}`}
                                />
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
