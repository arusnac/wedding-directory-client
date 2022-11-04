export interface IGallery {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  vendorId: string;
}

export interface IPhotographer {
  name: string;
  email: string;
  bio: string;
  website: string;
  featured: string;
  city: string;
  state: string;
  id: number;
  galleries: string[];
}

export interface displayDataPropsGallery {
  gallery: IGallery[] | undefined;
}

export interface IHandleClose {
  handleClose: () => void;
}
