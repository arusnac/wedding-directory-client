export interface IGallery {
  title: string;
  description: string;
  imageUrls: string[];
}

export interface IPhotographer {
  name: string;
  email: string;
  bio: string;
  website: string;
  featured: string;
  city: string;
  state: string;
  galleries: string[];
}
