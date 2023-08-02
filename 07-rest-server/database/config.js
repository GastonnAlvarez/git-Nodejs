const moongose = require('mongoose');

const dbConnection = async () => {
    try {
        await moongose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Base de Datos Online")
    } catch (error) {
        // console.log(error);
        throw new Error('Error a la hora de levantar el proceso de DB');
    }

};

module.exports = {
    dbConnection
}