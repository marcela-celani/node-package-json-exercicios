
import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import { createProduct, createUser, deleteProducts, deleteUser, editProducts, product, users } from './database'
import { Tproducts, Tusers } from './types'

// config express, cors, server
const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

// getAllUsers
app.get('/users', (req: Request, res: Response) => {
    const result: Tusers[] = users
    res.status(200).send(result)
})

// getAllProducts
app.get('/products', (req: Request, res: Response) => {
    const result: Tproducts[] = product
    res.status(200).send(result)
})

// getUserByName
app.get('/users/search', (req: Request, res: Response) => {
    const query = req.query.q as string
    if (query){
        const result: Tusers[] = users.filter((user) => user.name.toLowerCase() === query.toLowerCase())
        res.status(200).send(result)
    } else {
        res.status(200).send(users)
    }
})

// getProductByName
app.get('/products/search', (req: Request, res: Response) => {
    const query = req.query.q as string
    if(query){
        const result: Tproducts[] = product.filter((product) => product.name.toLowerCase() === query.toLowerCase())
        res.status(200).send(result)
    } else {
        res.status(200).send(product)
    }
})

// createUser
app.post('/users', (req: Request, res: Response): void => {
    const {id, name, email, password, createdAt}: {
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: string
    } = req.body

    const newUser = createUser(id, name, email, password, createdAt)
    res.status(201).send(newUser)
})

// createProducts
app.post('/products', (req: Request, res: Response): void => {
    const {id, name, price, description, imageUrl}: {
        id: string,
        name: string,
        price: number,
        description: string,
        imageUrl: string
    } = req.body

    const newProduct = createProduct(id, name, price, description, imageUrl)
    res.status(201).send(newProduct)
})

// deleteUser
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const handler = res.status(404).send({message: 'Usuário não encontrado'})

    deleteUser(id, handler)
    res.status(200).send({message: 'User apagado com sucesso'})
})

// deleteProducts
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const handler = res.status(404).send({message: 'Produto não encontrado'})
    
    deleteProducts(id, handler)

    res.status(200).send({message: 'Produto apagado com sucesso'})
})

// editProducts
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const handler = res.status(404).send({message: 'Produto não encontrado'})

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined
    
    editProducts(id, handler, newName, newPrice, newDescription, newImageUrl)

    res.status(200).send({message: 'Produto atualizado com sucesso'})
    
})


