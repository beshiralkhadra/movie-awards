export interface DefaultNomineeCardTypes {
  name: string;
  description: string;
  votes: number;
  stars: string[];
  image_url: string;
  release_date: Date;
}

export interface Nominee {
  id: string;
  name: string;
  description: string;
  votes: number;
  stars: {
    list: string[];
  };
  image_url: string;
  release_date: Date;
}
