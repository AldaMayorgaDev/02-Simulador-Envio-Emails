/* app */

//
const email ={
    email: '',
    asunto: '',
    mensaje: ''
}

//console.log('email :>> ', email);



// Se asegura que todo el contenido html se haya descargado.
document.addEventListener('DOMContentLoaded', function(){


    //Seleccionar los elementos de la interfaz

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
   

    //Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(evento){
        evento.preventDefault();
        resetFormulario()
    });



    function enviarEmail(evento) {
        evento.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();


            //Crear una alerta

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm' ,'uppercase');
            alertaExito.textContent = 'Mensaje Enviado con Éxito';
            console.log(alertaExito);
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 2000);
        }, 3000);
    }


    function validar(evento){
     /*    console.log();
        console.log(evento.target.value); */

        if(evento.target.value.trim() === ''){
            console.log('Esta vacio');
            mostrarAlerta(`El campo ${evento.target.id} es obligatorio`, evento.target.parentElement);
            email[evento.target.name]= '';
            comprobarEmail();
            return;
        }

        if(evento.target.id ==='email' && !validarEmail(evento.target.value)){
            mostrarAlerta('El email no es válido', evento.target.parentElement);
            email[evento.target.name]= '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evento.target.parentElement);

        email[evento.target.name]= evento.target.value.trim().toLowerCase();
        
        //comprobar el objeto de email

        comprobarEmail();
        
    }

    function mostrarAlerta(mensaje, referencia){

        //comprueba si ya existe una alerta
     limpiarAlerta(referencia);

        //Generar alerta en HTML

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'alerta');

        //Inyectar el error al formulario

        referencia.appendChild(error);

        //Asignar los valores al objeto

        
    }


    function limpiarAlerta(referencia){
          //comprueba si ya existe una alerta
          const alerta = referencia.querySelector('.alerta');
          if(alerta){
           alerta.remove();
          }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){

        /* Object.values(email) --> va a tomar todos los valores del objeto y lo va a converitir en array
        
        con .includes('') comprobramos si al menos uno valor esta vacio*/
        //console.log(Object.values(email).includes(''));
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disable = true;
            return;
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }

    function resetFormulario(){
              //reiniciar el objeto
              email.email = '';
              email.asunto = '';
              email.mensaje = '';
      
      
              formulario.reset();
              comprobarEmail();
    }
});


