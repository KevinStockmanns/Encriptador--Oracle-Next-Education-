const d = document

// ******* Al cargar la pagina se formatea lo que hay el el input ********
d.addEventListener('DOMContentLoaded',e=>{
    $input.value = '';
})


// ******* elementos del DOM ********
const $input = d.getElementById('texto'),
    $btnEnc = d.getElementById('encriptar'),
    $btnDes = d.getElementById('desencriptar'),
    $copyBtn = d.getElementById('copy'),
    $output = d.getElementById('outText'),
    $fullSec = d.getElementById('full-section'),
    $vacioSec = d.getElementById('vacio-section')


// ******* Variables necesarias ********
let text = '';
const patron = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}


// ******* Verificación de input y cuestiones de estilo ********
$input.addEventListener('keyup',e=>{
    text = e.target.value
    e.target.value = text.toLowerCase()
    if(/^[a-z\s]+$/.test(text.trim())){
        $btnEnc.disabled = false;
        $btnDes.disabled = false;
        d.getElementById('details').classList.remove('error')
    }else{
        $btnEnc.disabled = true;
        $btnDes.disabled = true;
        d.getElementById('details').classList.add('error')
    }
    if(!text){
        d.getElementById('details').classList.remove('error')
    }

    // Esto hace que al dar enter se encripte
    if(e.key == 'Enter'){
        $btnEnc.click()
    }
})


// ******* Proceso de encriptación ********
function encriptar(text){
    let textFinal = '';
    for(let i=0; i<text.length; i++){
        let char = text[i]
        if(char in patron){
            textFinal += patron[char]
        }else{
            textFinal += char
        }
    }
    return textFinal
}

// ******* Proceso de desencriptación ********
function desencriptar(text){
    Object.values(patron).forEach(el=>{
        while(text.includes(el)){
            let i = Object.values(patron).indexOf(el)
            text = text.replace(el, Object.keys(patron)[i])
        }
    })
    return text;
}

// ******* Cuando se apretan los botones de encri o desenc. cambia el frontend ********
function apareceText(){
    $vacioSec.classList.add('none')
    // $fullSec.classList.remove('none')
    $fullSec.classList.remove('hidden-up')
    
}



// ******* Asignacion de eventos a los botones ********
d.addEventListener('click',e=>{
    if(e.target == $btnEnc){
        if(text){
            apareceText()
            $output.textContent = encriptar(text)
        }
    }
    if(e.target == $btnDes){
        apareceText()
        $output.textContent = desencriptar(text)
    }
    if(e.target == $copyBtn){
        
        text = $output.textContent;
        navigator.clipboard.writeText(text)
        $input.value = text;
        $btnDes.disabled = false;

        $copyBtn.classList.add('btn-copied')
        $copyBtn.textContent = 'Copiado'
        $input.focus()
        setTimeout(() => {
            $copyBtn.classList.remove('btn-copied')
            $copyBtn.textContent = 'Copiar'
        }, 1000);
    }



    // Esto sirve para el boton del inicio
    if(e.target.matches('.nav-btn') || e.target.matches('.nav-btn > span')){
        d.getElementById('nav-btn').classList.toggle('active')
    }else{
        d.getElementById('nav-btn').classList.remove('active')
        
    }
})