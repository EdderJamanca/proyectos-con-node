
const moment = require('moment');

const isDate=(valor)=>{
   
    if(!valor){
        return false;
    }
    const fecha=moment(valor);

    if(fecha.isValid()){
        return true;
    }else {
        return false;
    }
}

module.exports={isDate}