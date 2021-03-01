const { MongoClient } = require("mongodb")

describe("insert", () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = await connection.db()
  })

  it("debería insertar un usuario correctamente", async () => {
    const users = db.collection("users")

    const mockUser = { firstName: "John", lastName: "Connor" }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ firstName: "John", lastName: "Connor"  })
    expect(insertedUser).toEqual(mockUser)
  })

  afterAll(async () => {
    await connection.close()
  })
})
