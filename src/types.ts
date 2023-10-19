export type Tusers = {
    id: string,
    name: string,
    email?: string,
    password: string,
    created_at? : string | undefined
}

export type Tproducts = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
}