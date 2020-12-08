export class MessageViewModel {
    exec;
    message;
    constructor(b){
        this.exec  = b.exec ? b.exec : null;
        this.message  = b.message ? b.message : null;
    }
}
