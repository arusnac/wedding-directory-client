import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/Admin.module.css";
import AddVendor from "../components/addPhotographer";
import Nav from "../components/nav";
import { useState } from "react";
import VendorModal from "../components/AddVendorModal";
import { Typography } from "@mui/material";
import CreateGallery from "../components/createGallery";
import { IGallery } from "../types";
import axios from "axios";
import DisplayData from "../components/admin/DisplayData";
import AddToGallery from "../components/AddToGallery";

export default function Admin() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [overlay, setOverlay] = useState<Boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);
  const [galleryList, setGalleryList] = useState<IGallery[] | undefined>();
  const [addToGallery, setAddToGallery] = useState<boolean>(false);

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

  const handleAddToGalleryOpen = () => {
    setAddToGallery(true);
    setOverlay(true);
  };

  const handleAddToGalleryClose = () => {
    setAddToGallery(false);
    setOverlay(false);
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
                <button onClick={() => handleAddToGalleryOpen()}>
                  Add To Gallery
                </button>
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
            {addToGallery && (
              <VendorModal>
                <AddToGallery handleClose={handleAddToGalleryClose} />
              </VendorModal>
            )}
            <div>{galleryList && <DisplayData gallery={galleryList} />}</div>
          </>
        )}
      </div>
    </div>
  );
}
