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
    $resetBtn = d.getElementById('reset'),
    $output = d.getElementById('outText'),
    $fullSec = d.getElementById('full-section'),
    $vacioSec = d.getElementById('vacio-section'),
    $history = d.getElementById('history')


// ******* Variables necesarias ********
let text = '',
    encriptWords = [];
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
    text = text.toLowerCase() // cambia las mayus a minus
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') //Remplaza los acentos
    e.target.value = text //ingreso esos cambios al textarea


    if(/^[a-z\s]+$/g.test(text.trim())){
        $btnEnc.disabled = false;
        $btnDes.disabled = false;
        $resetBtn.disabled = false
        d.getElementById('details').classList.remove('error')
    }else{
        $btnEnc.disabled = true;
        $btnDes.disabled = true;
        $resetBtn.disabled = true
        d.getElementById('details').classList.add('error')
    }
    if(!text){
        d.getElementById('details').classList.remove('error')
        apareceText(false)
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


    // se guarda en el historial si el tex es valido y se muestra en pantalla
    if(text.includes('a') || text.includes('e') || text.includes('i') || text.includes('o') || text.includes('u')){
        encriptWords.push(textFinal.trim())
        if(encriptWords.length > 0){
            d.getElementById('historyNone').classList.add('none')
            d.getElementById('historyBody').insertAdjacentHTML('beforeend', `<div>
                <p>${encriptWords[encriptWords.length - 1]}</p>
            </div>`)
        }
        d.getElementById('encriptWords').textContent = encriptWords.length
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
function apareceText(bool){
    if(bool){
        $vacioSec.classList.add('none')
        $fullSec.classList.remove('hidden-up')
    }else{
        $vacioSec.classList.remove('none')
        $fullSec.classList.add('hidden-up')
    }
    
}



// ******* Asignacion de eventos a los botones ********
d.addEventListener('click',e=>{
    if(e.target == $btnEnc){
        if(text){
            apareceText(true)
            $output.textContent = encriptar(text)
        }
    }
    if(e.target == $btnDes){
        apareceText(true)
        $output.textContent = desencriptar(text)
    }
    if(e.target == $copyBtn){
        
        text = $output.textContent;
        navigator.clipboard.writeText(text)
        $input.value = text;
        $btnDes.disabled = false;

        $copyBtn.classList.add('btn-copied')
        $copyBtn.textContent = 'Copiado'
        setTimeout(() => {
            $copyBtn.classList.remove('btn-copied')
            $copyBtn.textContent = 'Copiar'
        }, 1500);
    }
    if(e.target == $resetBtn){
        text = ''
        $input.value = text
        apareceText(false)
        $btnDes.disabled = true
        $btnEnc.disabled = true
        $resetBtn.disabled = true
    }



    if(e.target.matches('.history-header') || e.target.matches('.history-header *')){
        $history.classList.toggle('active')
    }else if(!e.target.matches('.history *')){
        $history.classList.remove('active')
    }


    // Esto sirve para el boton del inicio
    if(e.target.matches('.nav-btn') || e.target.matches('.nav-btn > span')){
        d.getElementById('nav-btn').classList.toggle('active')
    }else{
        d.getElementById('nav-btn').classList.remove('active')
        
    }



    if(e.target.matches('.btn')){
        let x = e.x - e.target.offsetLeft
        let y = e.y - e.target.offsetTop
        let span = d.createElement('span')
        span.style.top = `${y}px`
        span.style.left = `${x}px`
        e.target.appendChild(span)

        setTimeout(() => {
            span.remove()
        }, 500);
    }
})