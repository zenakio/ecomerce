// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Teclado Kumara Pro Gamer RGB",
        price: 259.99,
        image: "image/kumara.png"
    },
    {
        id: 2,
        name: "Mouse Gamer Attack Shark x11",
        price: 179.99,
        image: "image/attackshark.png"
    },
    {
        id: 3,
        name: "Fuxi-H3 HeadSet Gamer",
        price: 199.99,
        image: "image/fuxi-h3.png"
    },
    {
        id: 4,
        name: "Monitor Gamer Samsung T350 75hz",
        price: 749.99,
        image: "image/t350.png"
    },
    {
        id: 5,
        name: "Computador Gamer Neologic White",
        price: 2399.99,
        image: "image/pc.png"
    },
    {
        id: 6,
        name: "MousePad Force One Speed",
        price: 59.99,
        image: "image/forceone.png"
    },
    {
        id: 7,
        name: "Processador AMD Ryzen 5 5600g",
        price: 1200.99,
        image: "image/5600.png"
    },
    {
        id: 8,
        name: " Placa de Video NVIDIA RTX 4060",
        price: 2714.99,
        image: "image/rtx4060.png"
    },
    {
        id: 9,
        name: "KIT 3 fans ARGB Rise Mode",
        price: 99.99,
        image: "image/fansargb.png"
    },
    {
        id: 10,
        name: "Water Cooler Rise Mode RGB",
        price: 250.99,
        image: "image/watercooler.png"
    },
    {
        id: 11,
        name: "Controle Gamesir Nova Lite",
        price: 179.99,
        image: "image/novalite.png"
    },
    {
        id: 12,
        name: "Placa Mãe Gigabyte B550m",
        price: 789.99,
        image: "image/b550m.png"
    },
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2A1B3D;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

 // Seleciona o campo de CEP
 var campoCep = document.getElementById('cep');

 // Adiciona um "ouvinte" para quando o campo CEP perder o foco (blur)
 campoCep.addEventListener('blur', function () {
     // Remove qualquer caractere que não seja número
     let valorCep = campoCep.value.replace(/\D/g, '');

     // Faz a requisição para a API ViaCEP
     fetch("https://viacep.com.br/ws/" + valorCep + "/json/")
         .then(response => response.json()) // Converte a resposta para JSON
         .then(data => {
             if (!data.erro) { // Se não houver erro no retorno da API
                 // Preenche os campos do formulário com os dados recebidos
                 document.getElementById('logradouro').value = data.logradouro || '';
                 document.getElementById('bairro').value = data.bairro || '';
                 document.getElementById('cidade').value = data.localidade || '';
                 document.getElementById('estado').value = data.uf || '';

                 mudaBorda(0); // Chama função para deixar a borda verde
             } else {
                 limpaCampos(); // Limpa os campos se o CEP for inválido
                 mudaBorda(1); // Borda vermelha
             }
         })
         .catch(error => {
             console.error("Erro:", error); // Mostra o erro no console
             limpaCampos(); // Limpa os campos
             mudaBorda(1); // Borda vermelha
         });
 });

 // Função para mudar a cor da borda do campo de CEP
 function mudaBorda(cor) {
     if (cor === 1) {
         campoCep.style.border = '1px solid red'; // Vermelho: erro
     } else {
         campoCep.style.border = '1px solid green'; // Verde: sucesso
     }
 }

 // Função para limpar os campos do formulário
 function limpaCampos() {
     document.getElementById('logradouro').value = '';
     document.getElementById('bairro').value = '';
     document.getElementById('cidade').value = '';
     document.getElementById('estado').value = '';
 };

 function ConfirmarSenha() {
    // Pega os valores dos campos
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarsenha').value;

    // Verifica se são iguais
    if (senha === confirmarSenha) {
        alert("As senhas coincidem!");
        return true; // Pode enviar o formulário
    } else {
        alert("As senhas não coincidem!");
        return false; // Bloqueia envio do formulário
    }
};

function toggleSenha(id) {
    const input = document.getElementById(id);
    const container = input.nextElementSibling;
    const olhoAberto = container.querySelector('.olho-aberto');
    const olhoFechado = container.querySelector('.olho-fechado');

    if (input.type === "password") {
        input.type = "text";
        olhoAberto.style.display = "inline";
        olhoFechado.style.display = "none";
    } else {
        input.type = "password";
        olhoAberto.style.display = "none";
        olhoFechado.style.display = "inline";
    }
}