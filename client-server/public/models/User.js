class User {

  constructor(name, gender, birth, country, email, password, photo, admin) {

    this._id;
    this._name = name;
    this._gender = gender;
    this._birth = birth;
    this._country = country;
    this._email = email;
    this._password = password;
    this._photo = photo;
    this._admin = admin;
    this._register = new Date();

  }

  get id() {
    return this._id;
  }

  get register() {
    return this._register;
  }

  get name() {
    return this._name;
  }

  get gender() {
    return this._gender;
  }

  get birth() {
    return this._birth;
  }

  get country() {
    return this._country;
  }

  get email() {
    return this._email;
  }

  get photo() {
    return this._photo;
  }

  get password() {
    return this._password;
  }

  get admin() {
    return this._admin;
  }

  set photo(value) {
    this._photo = value;
  }
  // Carrega o objeto Json
  loadFromJSON(json) {

    for (let name in json) {

      switch (name) {

        case '_register':
          this[name] = new Date(json[name]);
          break;
        default:
          if (name.substring(0, 1) === "_") this[name] = json[name];

      }


    }

  }
  // Busca os dados e põe na tela.
  static getUsersStorage() {

    return Fetch.get('/users');

  }

  toJSON() {

    let json = {};

    Object.keys(this).forEach(key => {
      if (this[key] !== undefined)
        json[key] = this[key];
    });

    return json;

  }

  save() {

    return new Promise((resolve, reject) => {
      
      let promisse;
      //Altera os dados no banco
      if (this.id) {
        promisse = HttpRequest.put(`/users/${this.id}`, this.toJSON());
      } else {
        //Insere os dados no banco
        promisse = HttpRequest.post(`/users`, this.toJSON());
      }

      promisse.then(data => {

        this.loadFromJSON(data);

        resolve(this);
        
      }).catch(e => {
        reject(e);
      });
    });


  }
  remove(){
    //Faz a requisição passando o id
    return Fetch.delete(`/users/${this.id}`);
  }

}