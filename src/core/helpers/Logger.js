import config from '../../config'




class Logger{

    constructor(){
        this.config = config.logger || {
        };
    }

    log(message) {
        console.log()
    }
}


export default new Logger();


function log(){
    const args = arguments;
    for (let i=0;i<args.length;i++){
        
    }
}