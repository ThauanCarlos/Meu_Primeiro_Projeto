document.addEventListener("DOMContentLoaded", function() {
    // Lista de produtos
    const products = [
        {
            name: "Câmera IP 360 Externa à Prova d'Água",
            image: "cameras/camera_360.jpeg",
            price: 150.00
        },
        {
            name: "Câmera IP Olho de Peixe",
            image: "cameras/camera_olho_de_peixe.jpeg",
            price: 250.00
        },
        {
            name: "Câmera IP Segurança Lâmpada 360º",
            image: "cameras/camera_lampada.jpeg",
            price: 350.00
        },
        {
            name: "Interfone com Câmera",
            image: "cameras/Interfone_com_camera.jpeg",
            price: 400.00
        },
        {
            name: "Câmera Olho Vivo à Prova d'Água 360º",
            image: "cameras/camera-olho_vivo.jpeg",
            price: 300.00
        },
        {
            name: "Câmera com Tela",
            image: "cameras/Camera_para_tela.jpeg",
            price: 450.00
        },
        {
            name: "Concertina",
            image: "cameras/Concertina.jpg",
            price: 200.00
        },
        {
            name: "Kit Alarme Residencial",
            image: "cameras/Kit_Alarme_Residencial.jpeg",
            price: 500.00
        }
    ];

    // Função para gerar produtos na página principal e no modal
    function generateProducts() {
        const productList = document.querySelector('.product-list');
        const calcButtons = document.querySelector('.calc-buttons');

        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
            `;
            if (productList) {
                productList.appendChild(productItem);
            }

            const calcButton = document.createElement('button');
            calcButton.setAttribute('data-price', product.price);
            calcButton.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <span>${product.name}</span>
                <input type="number" value="0" min="0" class="product-quantity">
            `;
            if (calcButtons) {
                calcButtons.appendChild(calcButton);
            }
        });
    }

    // Modal variables
    var calcModal = document.getElementById("calcModal");
    var openCalcBtn = document.getElementById("openCalcBtn");
    var closeBtn = document.querySelector(".close");
    var finalizeBtn = document.getElementById("finalizeBtn");
    var calcDisplay = document.getElementById("calcDisplay");
    var topBtn = document.getElementById("topBtn");

    // Open the modal
    openCalcBtn.addEventListener("click", function() {
        calcModal.style.display = "block";
    });

    // Close the modal
    closeBtn.addEventListener("click", function() {
        calcModal.style.display = "none";
    });

    // Close the modal when clicking outside of the modal
    window.addEventListener("click", function(event) {
        if (event.target == calcModal) {
            calcModal.style.display = "none";
        }
    });

    // Update the quantity in the modal
    function updateQuantity() {
        var buttons = document.querySelectorAll(".calc-buttons button");
        var total = 100.00; // Starting with the mandatory fee

        buttons.forEach(function(button) {
            var price = parseFloat(button.getAttribute("data-price"));
            var quantity = button.querySelector(".product-quantity").value;
            total += price * quantity;
        });

        calcDisplay.value = "R$ " + total.toFixed(2);
    }

    // Event listener for quantity change
    document.addEventListener("change", function(event) {
        if (event.target.classList.contains("product-quantity")) {
            updateQuantity();
        }
    });

    // Finalize the budget and redirect to WhatsApp
    finalizeBtn.addEventListener("click", function() {
        var buttons = document.querySelectorAll(".calc-buttons button");
        var orderDetails = "";
        var total = 100.00; // Starting with the mandatory fee

        buttons.forEach(function(button) {
            var price = parseFloat(button.getAttribute("data-price"));
            var quantity = button.querySelector(".product-quantity").value;
            if (quantity > 0) {
                orderDetails += `${quantity}x ${button.querySelector("span").innerText} - R$ ${(price * quantity).toFixed(2)}\n`;
            }
            total += price * quantity;
        });

        var message = `Olá, gostaria de fazer um orçamento:\n\n${orderDetails}\nTotal: ${calcDisplay.value}`;
        var whatsappUrl = `https://wa.me/31985294448/?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, "_blank");
        calcModal.style.display = "none";
    });

    // Scroll to top button
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };

    topBtn.addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // Gerar produtos ao carregar a página
    generateProducts();
});
