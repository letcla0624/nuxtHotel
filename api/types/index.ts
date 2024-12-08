export interface GetResult<T> {
  status: boolean;
  result: T;
}

export interface Result {
  _id: string;
  title: string;
  description: string;
  diningTime?: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  smallImage: string;
}

export interface RoomResult {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: Info[];
  facilityInfo: Info[];
  amenityInfo: Info[];
  createdAt: string;
  updatedAt: string;
  smallImageUrl: string;
  smallImageUrlList: string[];
}

interface Info {
  title: string;
  isProvide: boolean;
}
