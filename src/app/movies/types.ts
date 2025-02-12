export interface ReviewData {
  author: string;
  title: string;
  content: string;
  rating: number;
}

export interface Review extends ReviewData {
  id: string;
  movieId: number;
  createdAt: string;
}
