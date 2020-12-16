export class User {
    constructor(
        public lastname: string,
        public firstname: string,
        public email: string,
        public id: string,
        public _accesstoken: string,
        private _tokenExpirationDate: Date
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._accesstoken;
    }
}