import validator from "validator";

export default class Register{
   constructor(){
      this.form = document.querySelector('.form-cadastro')
   }

   init(){
      this.events();
   }

   events() {
      if(!this.form) return;

      this.form.addEventListener('submit', e =>{
         e.preventDefault();
         this.validate(e)
      })
   }

   validate(e) {
      const el = e.target;
      const emailInput = el.querySelector('input[name="email"]')
      const passwordInput = el.querySelector('input[name="password"]')
      let error = false
      const pEmail = el.querySelector('p.errorEmail')
      const pPassword = el.querySelector('p.errorPassword')

      if(!validator.isEmail(emailInput.value)){
         pEmail.innerHTML = 'Email invalido'
         error = true
      }

      if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
         pPassword.innerHTML = 'Senha precisa ter entre 3 e 50 caracteres'
         error = true
      }

      if(!error) el.submit();

   }
}