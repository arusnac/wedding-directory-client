import { Component } from "react";
import styles from "./AddVendorModal.module.css";

const AddVendorModal = ({ children, modalType }: any) => {
  return (
    <>
      <div
        className={
          modalType === "gallery" ? styles.galleryModal : styles.addModal
        }
      >
        {children}
      </div>
    </>
  );
};

export default AddVendorModal;
