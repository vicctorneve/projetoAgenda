import validator from "validator";

export default class Contato {
   constructor(){
      this.form = document.querySelector('.formContato')
   }

   init(){
      this.events();
   }

   events(){
      if(!this.form) return

      this.form.addEventListener('submit', e =>{
         e.preventDefault();
         this.validate(e)
      })
   }

   async validate(e) {
      const el = e.target;
      const nameInput = el.querySelector('#inputName')
      const emailInput = el.querySelector('input[name="email"]')
      const phoneInput = el.querySelector('#inputPhone')
      let error = false

      const pErrorName = el.querySelector('.errorName')
      const pErrorEmail = el.querySelector('.errorEmail')
      const pErrorPhone = el.querySelector('.errorPhone')


      pErrorName.innerHTML = ''
      if(!nameInput.value) {
         error = true
         pErrorName.innerHTML ='Nome é um campo obrigatório'
      }
      pErrorEmail.innerHTML = ''
      if(emailInput.value && !validator.isEmail(emailInput.value)) {
         error = true
         pErrorEmail.innerHTML ='E-mail inválido';
      }


      pErrorEmail.innerHTML = ''
      pErrorPhone.innerHTML = ''
      if(!emailInput.value && !phoneInput.value) {
         error = true
         pErrorEmail.innerHTML ='É necessário adicionar pelo menos o telefone ou o email';
         pErrorPhone.innerHTML ='É necessário adicionar pelo menos o telefone ou o email';
      }

      

      if(!error) el.submit();

   }

   async userExists(){
      this.user = await LoginModel.findOne({email: this.body.email})
      if(this.user) this.errors.push('Usuário já existe')
   }

}