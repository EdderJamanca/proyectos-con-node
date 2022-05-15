
const mongoose = require('mongoose');


const bdConection=async()=>{

    try {

        mongoose.connect(process.env.BD_CNN);
        console.log('BD Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Problema al inicializar la base de datos');
    }

}

module.exports={
    bdConection
}