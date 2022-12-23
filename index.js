express = require('express')
const homeController = require('./controllers/home_controller')




const app = express()
const port = 8000
app.use(express.static('./assets'))

app.get('/', homeController.home)

app.listen(port, function (err) {
  if (err) {
    // console.log("Error:", err);
    console.log(`Error in running the server :",$(err)`)
  }
  console.log(`server is running on port :${port}`)
})
