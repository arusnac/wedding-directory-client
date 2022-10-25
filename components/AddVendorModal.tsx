import { Component } from "react";
import styles from "./AddVendorModal.module.css";

const AddVendorModal = ({ children, open }: any) => {
  return (
    <>
      <div className={styles.addModal}>{children}</div>
    </>
  );
};

export default AddVendorModal;
