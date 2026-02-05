export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  mobile_country_code: string;
  image?: string;
}

export interface ApiResponse<T> {
  status: boolean;
  status_code: number;
  message: string;
  data: T;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface ProductColor {
  name: string;
  value: string;
  selected?: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  description: string;
  rating: number;
  reviewsCount: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  types: string[];
}
