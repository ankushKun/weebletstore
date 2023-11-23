export type item = {
    name: string,
    anime: string,
    id: string,
    itype: "sticker" | "coaster" | "poster" | "bokmark",
    price: number,
    images: string[],
    postDescription: string,
    quantity?: number
}

export type ItemResponse = {
    [foo: string]: item
}

export type ErrorResponse = {
    error: string
}