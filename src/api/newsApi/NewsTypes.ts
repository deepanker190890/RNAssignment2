
export interface NewsRequest {
  page?: number;
  pageSize?: number;
}

export interface NewsResponse {
  status:       string | null; 
  totalResults: number | null;
  articles:     Article[] | null;
}

export interface Article {
  source:      Source | null;
  author:      string | null;
  title:       string | null;
  description: string | null;
  url:         string | null;
  urlToImage:  string | null;
  publishedAt: Date | null;
  content:     string | null;
}

export interface Source {
  id:   string;
  name: string;
}
