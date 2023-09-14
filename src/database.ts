import { Tproducts, Tusers } from "./types";

export const users: Tusers[] =
[
    {
        id: 'u001',
        name: 'Fulano',
        email: 'fulano@email.com',
        password: 'fulano123',
        createdAt : new Date().toLocaleString(),
    },
    {
        id: 'u002',
        name: 'Beltrana',
        email: 'beltrana@email.com',
        password: 'beltrana00',
        createdAt : new Date().toISOString(),
    }
]

export const product: Tproducts[] = [
    {
        id: 'prod001',
        name: 'Mouse gamer',
        price: 250,
        description: 'Melhor mouse do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
    },
    {
        id: 'prod002',
        name: 'Monitor',
        price: 900,
        description: 'Monitor LED Full HD 24 polegadas',
        imageUrl: 'https://picsum.photos/seed/Monitor/400',
    }
]

// funçao criar usuario
export const createUser = (id: string, name: string, email: string, password: string, createdAt: string): string => {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt,
    }
    
    users.push(newUser)
    return('Usuario criado com sucesso')
}

// funçao criar produto
export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): string => {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    }

    product.push(newProduct)
    return('Produto criado com sucesso')
}

// função deletar usuario
export const deleteUser = (id: string, handler: any): void => {
    
    const indexToDelete = product.findIndex((item)=> item.id === id)
    
    if(indexToDelete >=0){
        users.splice(indexToDelete,1)
    } else {
        handler()
    }
}

// função deletar produto
export const deleteProducts = (id: string, handler: any): void => {
    
    const indexToDelete = product.findIndex((item)=> item.id === id)
    
    if(indexToDelete >=0){
        product.splice(indexToDelete,1)
    } else {
        handler()
    }
}

// função editar produto
export const editProducts = (id:string, handler:any, newName:string, newPrice:number, newDescription:string, newImageUrl:string): void => {

    const productToEdit = product.find((item)=> item.id === id)

    if(productToEdit){
        productToEdit.name = newName || productToEdit.name
        productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
        productToEdit.description = newDescription || productToEdit.description
        productToEdit.imageUrl = newImageUrl || productToEdit.imageUrl
    } else {
        handler()
    }  
}
