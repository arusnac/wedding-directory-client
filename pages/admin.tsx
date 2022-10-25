import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/Admin.module.css";
import AddVendor from "../components/addPhotographer";
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import AddVendorModal from "../components/AddVendorModal";
import { Typography } from "@mui/material";

export default function Admin() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [overlay, setOverlay] = useState<Boolean>(false);

  const handleOpen = () => setOverlay(true);
  const handleClose = () => setOverlay(false);

  return (
    <div className={styles.container}>
      <div
        className={overlay && styles.overlay}
        onClick={() => setOverlay(false)}
      ></div>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Nav />
        <div className="flex-shrink-0 flex items-center bg-orange-500 h-20 w-20 border-radius p-2 font-bold text-4xl">
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
            <button onClick={() => setOverlay(!overlay)}>Add Vendor</button>
            {overlay && (
              <div className={styles.addModal}>
                <AddVendorModal>
                  <AddVendor open={handleClose} />
                </AddVendorModal>
              </div>
            )}

            {/* <div className={styles.addModal}>
              <h1>Add Vendor</h1>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
