import validator from "validator";

export default class Login{
   constructor(){
      this.form = document.querySelector('.form-login')
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
      const pPassword = el.querySelector('p.errorPassword')

      if(!validator.isEmail(emailInput.value)){
         pPassword.innerHTML = 'Usuário ou senha invalido'
         error = true
      }

      if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
         pPassword.innerHTML = 'Usuário ou senha invalido'
         error = true
      }

      if(!error) el.submit();

   }
}