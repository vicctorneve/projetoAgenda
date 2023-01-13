const moongose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')

const ContatoSchema = new moongose.Schema({
   nome: {type: String, required: true},
   sobrenome: {type: String, required: false, default: ''},
   email: {type: String, required: false, default: ''},
   telefone: {type: String, required: false, default: ''},
   criadoEm: {type: Date, default: Date.now},
});

const ContatoModel = moongose.model('Contato', ContatoSchema);

function Contato(body){
   this.body = body;
   this.errors = [];
   this.contato = null;
}

Contato.prototype.register = async function(){
   this.valida()
   
   if(this.errors.length > 0) return;
   
   await this.userExists()
   if(this.errors.length > 0) return;
   this.contato = await ContatoModel.create(this.body)
}


Contato.prototype.valida = function() {
   this.cleanUp();

   //O e-mail precisa ser válido
   if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

   if(!this.body.nome) {
      this.errors.push('Nome é um campo obrigatório')
   }

   if(!this.body.email && !this.body.telefone) {
      this.errors.push('É necessário adicionar pelo menos o telefone ou o email')
   }
}

Contato.prototype.cleanUp = function() {
   for( const key in this.body){
      if(typeof this.body[key] !== 'string'){
         this.body[key] = ''
      }
   }

   this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
   };
}

Contato.prototype.edit = async function(id){
   if(typeof id !== 'string') return
   this.valida();
   if(this.errors.length > 0) return

   await this.userExists()
   if(this.errors.length > 0) return;
   
   this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
}

Contato.prototype.userExists = async function(){
   
   const contatos = await ContatoModel.find()
                        .sort({criadoEm: -1})
   for (let i = 0; i < contatos.length; i++) {
      console.log(contatos[i])
      if(contatos[i].email == this.body.email){
         this.errors.push('Contato já existe')
         break;
      }
      if(contatos[i].telefone == this.body.telefone){
         this.errors.push('Contato já existe')
         break;
      }
   }

}

// Método estáticos

Contato.searchById = async function(id){
   if(typeof id !== 'string') return
   const contato = await ContatoModel.findById(id)
   return contato;
}

Contato.searchContacts = async function(){
   const contatos = await ContatoModel.find()
      .sort({criadoEm: -1})
   return contatos;
}

Contato.delete = async function(id){
   if(typeof id !== 'string') return
   const contato = await ContatoModel.findOneAndDelete({_id: id})
   return contato;
}


module.exports = Contato;
