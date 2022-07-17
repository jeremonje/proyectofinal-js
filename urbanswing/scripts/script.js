/*--------------------------------Carrito--------------------------------*/

const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
const button = e.target
const item = button.closest('.card')
const itemTitle = item.querySelector('.card-title').textContent;
const itemPrice = item.querySelector('.precio').textContent;
const itemImg = item.querySelector('.card-img-top').src;

const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
}

addItemCarrito(newItem)
}


function addItemCarrito(newItem){

const alert = document.querySelector('.alert')
setTimeout( function(){
    alert.classList.add('hide')
}, 2000)
    alert.classList.remove('hide')

const InputElemnto = tbody.getElementsByClassName('input__elemento')
for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
    carrito[i].cantidad ++;
    const inputValue = InputElemnto[i]
    inputValue.value++;
    CarritoTotal()
    return null;
    }
}

carrito.push(newItem)

renderCarrito()
} 

//Mostrar productos en el carrito

function renderCarrito(){
tbody.innerHTML = ''
carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
            <img src=${item.img}  alt="">
            <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
})
CarritoTotal()
}

//Calcular total

function CarritoTotal(){
let Total = 0;
const itemCartTotal = document.querySelector('.itemCartTotal')
carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
})

itemCartTotal.innerHTML = `Total $${Total}`
addLocalStorage()
}

function removeItemCarrito(e){
const buttonDelete = e.target
const tr = buttonDelete.closest(".ItemCarrito")
const title = tr.querySelector('.title').textContent;
for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
    carrito.splice(i, 1)
    }
}

//Mostrar por alerta que se removio un producto

const alert = document.querySelector('.remove')
setTimeout( function(){
    alert.classList.add('remove')
}, 2000)
    alert.classList.remove('remove')

tr.remove()
CarritoTotal()
}

function sumaCantidad(e){
const sumaInput  = e.target
const tr = sumaInput.closest(".ItemCarrito")
const title = tr.querySelector('.title').textContent;
carrito.forEach(item => {
    if(item.title.trim() === title){
    sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
    item.cantidad = sumaInput.value;
    CarritoTotal()
    }
})
}

//Guardar en el localStorage lo que se quede en el carrito

function addLocalStorage(){
localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
const storage = JSON.parse(localStorage.getItem('carrito'));
if(storage){
    carrito = storage;
    renderCarrito()
}
}


//-----------boton para leer mas/menos-----------//


function myFunction() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Leer Mas"; 
    moreText.style.display = "none";
    } else {
    dots.style.display = "none";
    btnText.innerHTML = "Leer Menos"; 
    moreText.style.display = "inline";
    }
}


/*--------------------------------formulario--------------------------------*/

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false
}

//validarFormulario

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

//Mostrar en html si el formulario se completa exitozamente

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 7000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


/*--------------------------------Mostrar lo mas vendido--------------------------------*/

// variables

const productList = document.querySelector('.product-list');


eventListeners();

// event listeners


function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        
    });

// cargar contenido de los elementos del producto desde  JSON


function loadJSON(){
    fetch('masvendido.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.imgSrc}" alt = "product image">
                        
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.nombre}</h3>
                        <span class = "product-category">${product.categoria}</span>
                        <p class = "product-price">$${product.precio}</p>
                    </div>
                </div>
            `;
        });
        productList.innerHTML = html;
    })

}}







//mostrar si hay stock en consola


class Producto {
    constructor(nombre, precio,  stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}
const stock = [];
stock.push(new Producto ("Mancuerna", "$ 4600" ,true ));
stock.push(new Producto("Pesa rusa",  "$ 8200", true));
stock.push(new Producto("Mochila Head", "$ 2400", true));
stock.push(new Producto("riñonera", "$ 2000", false));
stock.push(new Producto("Bolso Puma", "$ 3500", true));
stock.push(new Producto("Cuerda de Salto", "$ 700", true));

stock.push(new Producto ("Conjunto Nike", "$ 7999" ,false ));
stock.push(new Producto ("Conjunto CR7", "$ 5999" ,true ));
stock.push(new Producto("Conjunto Adidas",  "$ 6599", true));
stock.push(new Producto("Vendas de Boxeo", "$ 450", true));
stock.push(new Producto("Manopla", "$ 4999", true));
stock.push(new Producto("Protector Bucal", "$ 699", true));

stock.push(new Producto ("Casco de Boxeo", "$ 5299" ,true ));
stock.push(new Producto("Coquilla",  "$ 7999", true));
stock.push(new Producto("Guante Everlast", "$ 8200", true));
stock.push(new Producto("Guante Shark", "$ 6500", true));
stock.push(new Producto("Guante Charlie", "$ 7000", true));

stock.push(new Producto ("Guante Leone", "$ 8500" ,true ));
stock.push(new Producto("Barra de dominadas",  "$ 6800", true));
stock.push(new Producto("Media esfera", "$ 9700", true));
stock.push(new Producto("Barra Olimpica", "$ 8200", true));
stock.push(new Producto("Banco de pecho", "$ 22100", true));

stock.push(new Producto("Bolsa de Boxeo Everlast", "$ 11100", true));
stock.push(new Producto("Bolsa de Boxeo full sport", "$ 10500", false));
stock.push(new Producto("Bolsa de Boxeo Everlast (camuflada)", "$ 13100", true));

console.log(stock);

//Mostrar informacion sobre la tienda en consola

class Tienda{
    constructor(nombre, direccion, propietario, rubro){
        this.nombre = nombre;
        this.direccion = direccion;
        this.propietario = propietario;
        this.rubro = rubro;

    }
}

const tienda = new Tienda("Urbanswing", "Córdoba, Argentina", "jeremias Monje", "Tienda de Boxeo");
console.log(tienda);

