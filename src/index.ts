
import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import { product, users } from './database'
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
app.post('/users', (req: Request, res: Response) => {
    const {id, name, email, password, createdAt}: Tusers = req.body

    const newUser = {
        id,
        name,
        email,
        password,
        createdAt,
    }

    users.push(newUser)
    res.status(201).send('Usuario cadastrado com sucesso!')
})

// createProducts
app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, description, imageUrl}: Tproducts = req.body

    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    }

    product.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso!')
})

