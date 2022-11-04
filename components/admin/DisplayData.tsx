import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Image from "next/image";
import { displayDataPropsGallery } from "../../types";

const DisplayData = ({ gallery }: displayDataPropsGallery) => {
  return (
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
            {gallery?.map((galleryItem) => (
              <TableRow key={galleryItem.id}>
                <TableCell>{galleryItem.id}</TableCell>
                <TableCell>{galleryItem.title}</TableCell>
                <TableCell>{galleryItem.description}</TableCell>

                <TableCell>
                  {galleryItem.imageUrls?.map((url) => {
                    return <p key={url}>{url}</p>;
                  })}
                </TableCell>
                <TableCell>{galleryItem.vendorId}</TableCell>
                <TableCell>
                  {galleryItem.imageUrls?.map((url) => {
                    return (
                      <Image
                        key={url}
                        width="100"
                        height="100"
                        alt="vendor image"
                        src={`https://wedding-vendor-bucket.s3.us-west-2.amazonaws.com/${galleryItem.id}/${url}`}
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
  );
};

export default DisplayData;
