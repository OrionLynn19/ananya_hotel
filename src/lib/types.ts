export type ImageItem = { url: string; alt?: string };

export type Feature = {
  key: string;
  label: string;
  icon: string;
};

export type Facility = {
  id: string;
  name: string;
  icon: string;
};

export type Contact = {
  branch: string;
  address: string;
  phone: string;
  email: string;
};

export type Room = {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: Feature[];
  facilities: Facility[];
  images: ImageItem[];
  contacts: Contact[];
};
