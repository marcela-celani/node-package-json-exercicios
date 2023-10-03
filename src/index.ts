
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
    try {
        const result: Tusers[] = users
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// getAllProducts
app.get('/products', (req: Request, res: Response) => {
    try {
        const query = req.query.q as string | undefined
        if(query) { 
            if(query.length < 1){
                throw new Error('Query deve possuir pelo menos um caractere')
            }
            const result: Tproducts[] = product.filter((product) => product.name.toLowerCase() === query.toLowerCase())
            res.status(200).send(result)
        } else {
            res.status(200).send(product)
        }
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 404
            res.send(error.message)
        }
    }
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
    try {
        const {id, name, email, password, createdAt}: {
            id: string,
            name: string,
            email: string,
            password: string,
            createdAt: string
        } = req.body

        if(!id || typeof id !== 'string'){
            throw new Error("Id deve ser uma 'string'")
        }

        const idIndex: number = users.findIndex((user) => user.id === id)
        if(idIndex >= 0){
            throw new Error("O Id fornecido já existe. Escolha um Id único")
        }

        if(!name || typeof name !== 'string'){
            throw new Error("Name deve ser uma 'string'")
        }

        if(!email || typeof email !== 'string'){
            throw new Error("Email deve ser uma 'string'")
        }

        const emailIndex: number = users.findIndex((user) => user.id === id)
        if(emailIndex >= 0){
            throw new Error("O email fornecido já existe. Escolha um email único")
        }

        if(!password || typeof password !== 'string'){
            throw new Error("Password deve ser uma 'string'")
        }
    
        const newUser = createUser(id, name, email, password, createdAt)
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// createProducts
app.post('/products', (req: Request, res: Response): void => {
    try {
        const {id, name, price, description, imageUrl}: {
            id: string,
            name: string,
            price: number,
            description: string,
            imageUrl: string
        } = req.body
    
        if(!id || typeof id !== 'string'){
            throw new Error("Id deve ser uma 'string'")
        }

        const idIndex: number = product.findIndex((product) => product.id === id)
        if(idIndex >= 0){
            throw new Error("O Id fornecido já existe. Escolha um Id único")
        }

        if(!name || typeof name !== 'string'){
            throw new Error("name deve ser uma 'string'")
        }

        if(!price || typeof price !== 'number' || price < 0){
            throw new Error("price deve ser um 'number' positivo")
        }

        if(!description || typeof description !== 'string'){
            throw new Error("description deve ser uma 'string'")
        }

        if(!imageUrl || typeof imageUrl !== 'string'){
            throw new Error("imageUrl deve ser uma 'string'")
        }

        const newProduct = createProduct(id, name, price, description, imageUrl)
        res.status(201).send(newProduct)
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// deleteUser
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idIndex: number = users.findIndex((user) => user.id === id)

        if(idIndex === -1){
            throw new Error('Usuário não encontrado')
        }

        deleteUser(id)
        res.status(200).send({message: 'User apagado com sucesso'})
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// deleteProducts
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
    
        const idIndex: number = product.findIndex((product) => product.id === id)

        if(idIndex === -1){
            throw new Error('Produto não encontrado')
        }
    
        deleteProducts(id)
        res.status(200).send({message: 'Produto apagado com sucesso'})
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// editProducts
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined
    
        const idIndex: number = product.findIndex((product) => product.id === id)
        if(idIndex === -1){
            throw new Error("O produto não existe")
        }

        editProducts(id, newName, newPrice, newDescription, newImageUrl)

        res.status(200).send({message: 'Produto atualizado com sucesso'})
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})


// função data
export const date = new Date().toISOString()
