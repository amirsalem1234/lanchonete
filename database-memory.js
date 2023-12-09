import { randomUUID } from "crypto"

export class DatabaseMemory {
    #lanche = new Map()

    list(search) {
        return Array.from(this.#lanche.entries()).map((lancheArray) => {
            const id = lancheArray[0]
            const data = lancheArray[1]

            return {
                id,
                ...data
            }

        })
            .filter(lanches => {
                if (search) {
                    return lanches.lanches.includes(search)
                }
                return true
            })
    }
    create(lanches) {
        const lanchesId = randomUUID()
        this.#lanche.set(lanchesId, lanches)
    }
    update(id, lanches) {
        this.#lanche.set(id, lanches)
    }
    delete(id, lanches) {
        this.#lanche.delete(id, lanches)
    }
}