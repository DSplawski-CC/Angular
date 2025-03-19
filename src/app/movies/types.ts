export interface ReviewData {
  author: User;
  title: string;
  content: string;
  rating: number;
}

export interface Review extends ReviewData {
  id: string;
  movieId: number;
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
}
