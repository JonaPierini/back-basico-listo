const mongoose = require('mongoose')

//Funcion para conectarme a la base de datos
// Utilizamos MONGOOSE
const dbConnection = async() =>{
    try {
       await mongoose.connect(process.env.MONGODB_CNN)
       console.log('base de datos on line')
       
    } catch (error) {
        console.log(error)
        throw new Error('Error en base de datos')
    }
}

module.exports = {
    dbConnection
}