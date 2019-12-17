const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user')
require('./db/db')

const port = process.env.PORT
const app = express()

// todo restrict to domain
app.use(cors())
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})