const menu = document.getElementById("menu")
const carBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartIntemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const anddressInput = document.getElementById("address")
const anddressWarn = document.getElementById("address-warn")

// A nossa lista carrinho sempre começa com uma array vazia
let cart = [];

// Abrir o modal do carrinho

carBtn.addEventListener("click", function () {
    updateCartModal()
    cartModal.style.display = "flex"
})

// Fechar o modal quando clicar fora. target é o elemento que disparou o evento, enquanto event. 
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }

})

// Fechar o modal ao clicar fechar 
closeModalBtn.addEventListener("click", function (event) {
    if (event.target === closeModalBtn)
        cartModal.style.display = "none"
})

menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn")
    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        // Adicionar no carrinho.
        addToCart(name, price)
    }
})

// Função para adiocinar no carrinho

function addToCart(name, price) {
    // Verifica se já tem 
    const existingItem = cart.find(item => item.name === name)
    // Se tem, só muda a quantidade pra + 1. 
    if (existingItem) {
        // se o item já existe, aumenta apenas a quantidade + 1 
        existingItem.quantity += 1;

        // Se não tiver ele vai pular o IF e adicionar um item com quantidade 1 
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}

// além de adicionar no carrinho, iremos mostrar visualmente caso abra o modal. Ou seja, atualiza o carrinho.
function updateCartModal() {
    cartIntemsContainer.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        //  Quando acessar esse item cartItemElemente, basicamente está criando uma nova div
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col"  )
        // Dentro dela eu quero colocar os meu itens
        cartItemElement.innerHTML = `
        <div   class="flex items-center justify-between"> 
            <div> 
            <p class="font-medium">${item.name} </p>
            <p>Qtd: ${item.quantity}</p>
            <p class= "font-medium mb-2">R$ ${item.price.tofixed(2)} </p>
            </div>

         
            <button>
                remover
            </button>
         
        </div>
        
        `
        // colocar um item dentro, que é o nosso cartItemElement
        cartIntemsContainer.appendChild(cartItemElement)
    })

}
