export type Item = {
  name: string;
  anime: string;
  id: string;
  itype: "sticker" | "coaster" | "poster" | "bokmark";
  price: number;
  images: string[];
  description?: string;
  postDescription: string;
  quantity?: number;
};

export type ItemResponse = {
  [foo: string]: Item;
};

export type ErrorResponse = {
  error: string;
};

export type PromoDetails = {
  discount?: number;
  delivery?: number;
  easteregg?: string;
};
