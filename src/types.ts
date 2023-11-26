export type ImgAsset = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  _key: string;
  _type: "image";
}

export type Item = {
  _id: string;
  name: string;
  anime: string;
  itype: "sticker" | "coaster" | "poster" | "bokmark";
  price: number;
  images: ImgAsset[];
  description?: string;
  postDescription: string;
  quantity?: number;
  slug: string;
};

export type Description = {
  description: string;
  _id: string;
}

export type ErrorResponse = {
  error: string;
};

export type PromoDetails = {
  promoCode: string;
  promoType: string;
  value: number;
};
