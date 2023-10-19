import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import { db } from "./database/knex";
import { Tproducts, Tusers } from './types'

// config express, cors, server
const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

// getAllUsers
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result: Tusers[] = await db("users");
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// createUser
app.post('/users', async (req: Request, res: Response):Promise<void> => {
    try {
        const {id, name, email, password, created_at}: {
            id: string,
            name: string,
            email: string,
            password: string,
            created_at: string
        } = req.body

        const [ user ] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${id}";
        `)

        if (user) {
            res.status(404)
            throw new Error("O Id fornecido já existe. Escolha um Id único")
        }

        if(!id || typeof id !== 'string'){
            throw new Error("Id deve ser uma 'string'")
        }

        if(!name || typeof name !== 'string'){
            throw new Error("Name deve ser uma 'string'")
        }

        if(!email || typeof email !== 'string'){
            throw new Error("Email deve ser uma 'string'")
        }

        const [ userEmail ] = await db.raw(`
            SELECT * FROM users
            WHERE email = "${email}";
        `)

        if (userEmail) {
            res.status(404)
            throw new Error("O email fornecido já existe. Escolha um email único")
        }

        if(!password || typeof password !== 'string'){
            throw new Error("Password deve ser uma 'string'")
        }
        
        await db.raw(`
            INSERT INTO users (id, name, email, password)
            VALUES ("${id}", "${name}", "${email}", "${password}");
        `)

        res.status(201).send({message: 'Cadastro realizado com sucesso'})
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// getAllProducts
app.get('/products', async (req: Request, res: Response):Promise<void> => {
    try {
        const name = req.query.name as string
        let result: Tproducts[]
        if(name) { 
            result = await db.raw(`SELECT * FROM products WHERE name LIKE '%${name}%'`);
            res.status(200).send(result)
        } else {
            result = await db.raw(`SELECT * FROM products`);
            res.status(200).send(result)
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
// app.get('/users/search', (req: Request, res: Response) => {
//     const query = req.query.q as string
//     if (query){
//         const result: Tusers[] = users.filter((user) => user.name.toLowerCase() === query.toLowerCase())
//         res.status(200).send(result)
//     } else {
//         res.status(200).send(users)
//     }
// })

// createProducts
app.post('/products', async (req: Request, res: Response):Promise<void> => {
    try {
        const {id, name, price, description, image_url}: {
            id: string,
            name: string,
            price: number,
            description: string,
            image_url: string
        } = req.body
    
        const [ product ] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";
        `)

        if (product) {
            res.status(404)
            throw new Error("O Id fornecido já existe. Escolha um Id único")
        }

        if(!id || typeof id !== 'string'){
            throw new Error("Id deve ser uma 'string'")
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

        if(!image_url || typeof image_url !== 'string'){
            throw new Error("imageUrl deve ser uma 'string'")
        }

        await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}", "${name}", "${price}", "${description}", "${image_url}");
        `)

        res.status(201).send({message: 'Produto cadastrado com sucesso'})

        
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})

// deleteUser
// app.delete('/users/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const idIndex: number = users.findIndex((user) => user.id === id)

//         if(idIndex === -1){
//             throw new Error('Usuário não encontrado')
//         }

//         deleteUser(id)
//         res.status(200).send({message: 'User apagado com sucesso'})
//     } catch (error) {
//         console.log(error)
//         if(error instanceof Error){
//             res.statusCode = 400
//             res.send(error.message)
//         }
//     }
// })

// deleteProducts
// app.delete('/products/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
    
//         const idIndex: number = product.findIndex((product) => product.id === id)

//         if(idIndex === -1){
//             throw new Error('Produto não encontrado')
//         }
    
//         deleteProducts(id)
//         res.status(200).send({message: 'Produto apagado com sucesso'})
//     } catch (error) {
//         console.log(error)
//         if(error instanceof Error){
//             res.statusCode = 400
//             res.send(error.message)
//         }
//     }
// })

// editProducts
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.image_url as string | undefined
    
        if (newName !== undefined) {

            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }

            if (newName.length < 1) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 1 caractere")
            }
        }

        const [ product ] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";
        `)

        if (product) {
            await db.raw(`
                UPDATE products
                SET
                    name = "${newName || product.name}",
                    price = "${newPrice || product.price}",
                    description = "${newDescription || product.description}",
                    image_url = "${newImageUrl || product.image_url}"
                WHERE
                    id = "${id}";
            `)
        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send({ message: "Produto atualizado com sucesso" })

    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.statusCode = 400
            res.send(error.message)
        }
    }
})