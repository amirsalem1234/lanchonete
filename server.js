import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/lanche', (request, reply) => {
    const {pedido, ingredientes, tipo, refri} = request.body
   // console.log(body)
   // return 'cadastrar'
    database.create({
        pedido: pedido,
        ingredientes: ingredientes,
        tipo: tipo,
        refri: refri
    })

    return reply.status(201).send
})

server.get('/lanche', (request) => {
    const search = request.query.search
    console.log(search)
    const lanches = database.list(search)
   // console.log(lanches)
    return lanches
})

server.put('/lanches/:id', (request, reply) => {
    const lancheId = request.params.id
    const {pedido, ingredientes, tipo, refri} = request.body
    const lanche = database.update(lancheId, {
        pedido: pedido,
        ingredientes: ingredientes,
        tipo: tipo,
        refri: refri
    })
    return reply.status(204).send()
})

server.delete("/lanches/:id", (request, reply) => {
    const lancheId = request.params.id

    database.delete(lancheId)

    return reply.status(204).send()
})
server.listen({
    port: 3333,
})