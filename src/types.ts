export type Tusers = {
    id: string,
    name: string,
    email?: string,
    password: string,
    createdAt? : string | undefined
}

export type Tproducts = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
}