
const Templates = {
    home() {
        const container = document.createElement("div");
        container.className = "page";

        const titulo = document.createElement("h2");
        titulo.textContent = "Página Inicial";

        const texto = document.createElement("p");
        texto.textContent = "Bem-vindo à nossa Single Page Application!";

        container.appendChild(titulo);
        container.appendChild(texto);

        return container;
    },

    sobre() {
        const container = document.createElement("div");
        container.className = "page";

        const titulo = document.createElement("h2");
        titulo.textContent = "Sobre";

        const texto = document.createElement("p");
        texto.textContent = "Esta é a página sobre nosso sistema SPA.";

        container.appendChild(titulo);
        container.appendChild(texto);

        return container;
    },

    contato() {
        const container = document.createElement("div");
        container.className = "page";

        const titulo = document.createElement("h2");
        titulo.textContent = "Contato";

        const texto = document.createElement("p");
        texto.textContent = "Entre em contato conosco.";

        const botao = document.createElement("button");
        botao.textContent = "Enviar mensagem";

        // EVENTO DOM (opção 5)
        botao.addEventListener("click", () => {
            alert("Mensagem enviada!");
        });

        container.appendChild(titulo);
        container.appendChild(texto);
        container.appendChild(botao);

        return container;
    }
};

// -----------------------
// LOADER (opção 8)
// -----------------------
function showLoader() {
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100%";
    loader.style.height = "100%";
    loader.style.background = "rgba(255,255,255,0.8)";
    loader.style.display = "flex";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";
    loader.style.fontSize = "24px";
    loader.style.zIndex = "999";
    loader.innerText = "Carregando...";

    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.remove();
}

// -----------------------
// SISTEMA DE ROTAS
// -----------------------
const routes = {
    "/": Templates.home,
    "/sobre": Templates.sobre,
    "/contato": Templates.contato
};

// -----------------------
// FUNÇÃO DE NAVEGAÇÃO SPA
// -----------------------
function navigate(path) {
    const app = document.getElementById("app");

    // Loader
    showLoader();

    setTimeout(() => {
        const template = routes[path];

        if (!template) {
            app.innerHTML = "<h2>Página não encontrada</h2>";
            hideLoader();
            return;
        }

        
        app.style.opacity = 0;

        setTimeout(() => {

            app.innerHTML = "";
            app.appendChild(template());

           
            app.style.opacity = 1;

            hideLoader();

        }, 300);

    }, 300);

    window.history.pushState({}, "", path);
}


window.addEventListener("popstate", () => {
    navigate(window.location.pathname);
});


document.addEventListener("DOMContentLoaded", () => {
    const app = document.createElement("div");
    app.id = "app";
    app.style.transition = "opacity 0.3s";
    document.body.appendChild(app);

    const menu = document.createElement("nav");
    menu.innerHTML = `
        <a href="/" data-link>Início</a> |
        <a href="/sobre" data-link>Sobre</a> |
        <a href="/contato" data-link>Contato</a>
    `;
    document.body.insertBefore(menu, app);

    document.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigate(e.target.getAttribute("href"));
        }
    });

    navigate(window.location.pathname || "/");
});
