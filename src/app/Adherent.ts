export class Adherent {

  _id: String;
  nom: String;
  prenom: String;
  dateNaissance: Date;
  dateCreation: Date;
  ecole: String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
