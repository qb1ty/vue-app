const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./vue-project/dist'))

app.listen(port, () => console.log('Server has been started on port 3000'))