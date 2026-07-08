document.addEventListener("DOMContentLoaded", () => {
  const paginaAtual = document.body.dataset.page;
  const links = document.querySelectorAll(".nav-link[data-page]");

  links.forEach((link) => {
    if (link.dataset.page === paginaAtual) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  function ajustarMenuAoNavegador() {
    const viewport = window.visualViewport;

    if (!viewport) {
      return;
    }

    const alturaLayout = document.documentElement.clientHeight;

    const espacoInferior = Math.max(
      0,
      alturaLayout - viewport.height - viewport.offsetTop
    );

    document.documentElement.style.setProperty(
      "--browser-ui-offset",
      `${Math.round(espacoInferior)}px`
    );
  }

  ajustarMenuAoNavegador();

  window.addEventListener("resize", ajustarMenuAoNavegador);

  window.addEventListener("orientationchange", () => {
    setTimeout(ajustarMenuAoNavegador, 180);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", ajustarMenuAoNavegador);
    window.visualViewport.addEventListener("scroll", ajustarMenuAoNavegador);
  }

  const categoryTrack = document.getElementById("categoryTrack");
  const categoryPrev = document.getElementById("categoryPrev");
  const categoryNext = document.getElementById("categoryNext");
  const categoryDots = document.querySelectorAll(".categoria-ponto");

  if (categoryTrack && categoryPrev && categoryNext) {
    function larguraDoDeslocamento() {
      const primeiroCard = categoryTrack.querySelector(".categoria-card");

      if (!primeiroCard) {
        return 300;
      }

      const estilos = window.getComputedStyle(categoryTrack);
      const espacamento = parseFloat(estilos.gap) || 0;
      const quantidade = window.innerWidth <= 760 ? 1 : 2;

      return (primeiroCard.offsetWidth + espacamento) * quantidade;
    }

    categoryPrev.addEventListener("click", () => {
      categoryTrack.scrollBy({
        left: -larguraDoDeslocamento(),
        behavior: "smooth",
      });
    });

    categoryNext.addEventListener("click", () => {
      categoryTrack.scrollBy({
        left: larguraDoDeslocamento(),
        behavior: "smooth",
      });
    });

    function atualizarPontos() {
      if (!categoryDots.length) {
        return;
      }

      const limite = categoryTrack.scrollWidth - categoryTrack.clientWidth;

      if (limite <= 0) {
        return;
      }

      const progresso = categoryTrack.scrollLeft / limite;
      const indiceAtivo = Math.round(progresso * (categoryDots.length - 1));

      categoryDots.forEach((ponto, indice) => {
        ponto.classList.toggle("ativo", indice === indiceAtivo);
      });
    }

    categoryTrack.addEventListener("scroll", atualizarPontos, {
      passive: true,
    });

    atualizarPontos();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const categoriasBusca = [
    {
      nome: "Inverno Infantil",
      imagem: "categorias/inverno-infantil.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=A%20-%20INVERNO%20INFANTIL",
      palavras: "inverno infantil criança crianca frio casaco jaqueta",
    },
    {
      nome: "Blusinha Feminina",
      imagem: "categorias/blusinha-feminina.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=B%20-%20BLUSINHA%20FEMININA",
      palavras: "blusa blusinha feminina tricot tricô",
    },
    {
      nome: "Calças Inverno",
      imagem: "categorias/calcas-inverno.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=C%20-%20CAL%C3%87AS",
      palavras: "calca calças inverno frio",
    },
    {
      nome: "Roupa Íntima",
      imagem: "categorias/roupa-intima.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=D%20-%20ROUPA%20INTIMA%20-%20FEM%20%2F%20MASC%20%2F%20INFANTIL",
      palavras: "roupa intima íntima lingerie calcinha sutiã sutia masculino feminina infantil",
    },
    {
      nome: "Fitness",
      imagem: "categorias/fitness.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=E%20-%20FITNESS",
      palavras: "fitness academia treino esporte legging",
    },
    {
      nome: "Luva, Touca e Gorro",
      imagem: "categorias/luva-touca-gorro.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=F%20-%20LUVA%20%2F%20TOUCA%20%2F%20GORRO-ADULTO%2FINFANTIL",
      palavras: "luva touca gorro inverno frio adulto infantil",
    },
    {
      nome: "Cachecóis e Lenços",
      imagem: "categorias/cachecois-lencos.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=G%20-%20CACHEC%C3%93IS%20E%20LEN%C3%87OS",
      palavras: "cachecol cachecois lenço lenco inverno",
    },
    {
      nome: "Acessórios de Beleza",
      imagem: "categorias/acessorios-beleza.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=H%20-%20ACESS%C3%93RIOS%20CABELO%2C%20UNHA%20E%20MAQUIAGEM",
      palavras: "acessorio acessório beleza maquiagem unha cabelo",
    },
    {
      nome: "Conjuntos",
      imagem: "categorias/conjuntos.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=I%20-%20CONJUNTOS",
      palavras: "conjunto conjuntos roupa combinado",
    },
    {
      nome: "Meias e Pantufas",
      imagem: "categorias/meias-pantufas.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=J%20-%20MEIAS%20%2F%20PANTUFAS%20-%20MASC%2FFEM%2FINFANTIL",
      palavras: "meia meias pantufa pantufas masculino feminina infantil",
    },
    {
      nome: "Regata / Camisa",
      imagem: "categorias/regata-camisa-fem-masc-infantil.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=K%20-%20REGATA%20%2F%20CAMISA%20-%20FEM%2FMASC%2FINFANTIL",
      palavras: "regata camisa feminina masculino infantil",
    },
    {
      nome: "Acessório Infantil",
      imagem: "categorias/acessorio-infantil.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=L%20-%20ACESSORIOS%20INFANTIL",
      palavras: "acessorio acessório infantil criança crianca",
    },
    {
      nome: "Acessórios",
      imagem: "categorias/acessorios-gerais.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=N%20-%20ACESSORIOS",
      palavras: "acessorio acessório acessorios acessórios geral",
    },
    {
      nome: "Necessaire Feminina",
      imagem: "categorias/necessaire-feminina.png",
      url: "https://importadorakontudo.pedidook.com.br/?categoria=O%20-%20NECESSAIRE%20FEM.",
      palavras: "necessaire nécessaire feminina bolsa maquiagem",
    },
  ];

  function normalizarTexto(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  document.querySelectorAll("[data-category-search]").forEach((blocoBusca) => {
    const formulario = blocoBusca.querySelector(".category-search-form");
    const campo = blocoBusca.querySelector(".category-search-input");
    const resultados = blocoBusca.querySelector(".category-search-results");

    function buscarCategorias(texto) {
      const busca = normalizarTexto(texto);

      if (!busca) {
        return categoriasBusca.slice(0, 5);
      }

      return categoriasBusca.filter((categoria) => {
        const conteudo = normalizarTexto(
          `${categoria.nome} ${categoria.palavras}`
        );

        return conteudo.includes(busca);
      });
    }

    function mostrarResultados(lista) {
      resultados.innerHTML = "";

      if (lista.length === 0) {
        resultados.innerHTML = `
          <p class="category-search-empty">
            Nenhuma categoria encontrada. Tente outra palavra.
          </p>
        `;
      } else {
        lista.forEach((categoria) => {
          resultados.innerHTML += `
            <a
              href="${categoria.url}"
              class="category-search-result"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="${categoria.imagem}" alt="" />

              <div class="category-search-result-info">
                <strong>${categoria.nome}</strong>
                <span>Categoria</span>
              </div>

              <svg
                class="category-search-result-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 6l6 6-6 6"></path>
              </svg>
            </a>
          `;
        });
      }

      resultados.classList.add("is-visible");
      campo.setAttribute("aria-expanded", "true");
    }

    function esconderResultados() {
      resultados.classList.remove("is-visible");
      campo.setAttribute("aria-expanded", "false");
    }

    campo.addEventListener("focus", () => {
      mostrarResultados(buscarCategorias(campo.value));
    });

    campo.addEventListener("input", () => {
      mostrarResultados(buscarCategorias(campo.value));
    });

    campo.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") {
        esconderResultados();
        campo.blur();
      }
    });

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const sugestoes = buscarCategorias(campo.value);

      if (campo.value.trim() && sugestoes.length > 0) {
        window.open(
          sugestoes[0].url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    });

    document.addEventListener("click", (evento) => {
      if (!blocoBusca.contains(evento.target)) {
        esconderResultados();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trackInverno = document.querySelector("[data-inverno-track]");
  const botaoAnterior = document.querySelector("[data-inverno-prev]");
  const botaoProximo = document.querySelector("[data-inverno-next]");

  if (!trackInverno || !botaoAnterior || !botaoProximo) return;

  const cardsInverno = [...trackInverno.querySelectorAll(".inverno-produto-card")];

  let indiceAtual = 0;

  function quantidadeVisivel() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 3;
    return 5;
  }

  function moverCarrossel() {
    if (window.innerWidth <= 760) {
      trackInverno.style.transform = "translateX(0)";
      return;
    }

    const primeiroCard = cardsInverno[0];

    if (!primeiroCard) return;

    const espacamento = parseFloat(
      window.getComputedStyle(trackInverno).gap
    ) || 16;

    const larguraMovimento = primeiroCard.offsetWidth + espacamento;

    trackInverno.style.transform = `translateX(-${
      indiceAtual * larguraMovimento
    }px)`;
  }

  botaoProximo.addEventListener("click", () => {
    const limite = cardsInverno.length - quantidadeVisivel();

    indiceAtual = indiceAtual >= limite ? 0 : indiceAtual + 1;

    moverCarrossel();
  });

  botaoAnterior.addEventListener("click", () => {
    const limite = cardsInverno.length - quantidadeVisivel();

    indiceAtual = indiceAtual <= 0 ? limite : indiceAtual - 1;

    moverCarrossel();
  });

  window.addEventListener("resize", () => {
    const limite = cardsInverno.length - quantidadeVisivel();

    if (indiceAtual > limite) {
      indiceAtual = 0;
    }

    moverCarrossel();
  });

  moverCarrossel();
});

document.addEventListener("DOMContentLoaded", () => {
  const trackAvaliacoes = document.querySelector("[data-avaliacoes-track]");
  const botaoAnterior = document.querySelector("[data-avaliacao-prev]");
  const botaoProximo = document.querySelector("[data-avaliacao-next]");

  if (!trackAvaliacoes || !botaoAnterior || !botaoProximo) return;

  const cardsAvaliacoes = [
    ...trackAvaliacoes.querySelectorAll(".avaliacao-card"),
  ];

  let indiceAtual = 0;

  function quantidadeVisivel() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
  }

  function moverAvaliacoes() {
    if (window.innerWidth <= 760) {
      trackAvaliacoes.style.transform = "translateX(0)";
      return;
    }

    const primeiroCard = cardsAvaliacoes[0];

    if (!primeiroCard) return;

    const espacamento =
      parseFloat(window.getComputedStyle(trackAvaliacoes).gap) || 18;

    const larguraMovimento = primeiroCard.offsetWidth + espacamento;

    trackAvaliacoes.style.transform = `translateX(-${
      indiceAtual * larguraMovimento
    }px)`;
  }

  botaoProximo.addEventListener("click", () => {
    const limite = cardsAvaliacoes.length - quantidadeVisivel();

    indiceAtual = indiceAtual >= limite ? 0 : indiceAtual + 1;

    moverAvaliacoes();
  });

  botaoAnterior.addEventListener("click", () => {
    const limite = cardsAvaliacoes.length - quantidadeVisivel();

    indiceAtual = indiceAtual <= 0 ? limite : indiceAtual - 1;

    moverAvaliacoes();
  });

  window.addEventListener("resize", () => {
    const limite = cardsAvaliacoes.length - quantidadeVisivel();

    if (indiceAtual > limite) {
      indiceAtual = 0;
    }

    moverAvaliacoes();
  });

  moverAvaliacoes();
});

document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterMensagem = document.getElementById("newsletterMensagem");
  const newsletterBotao = newsletterForm?.querySelector(".newsletter-botao");

  if (!newsletterForm || !newsletterEmail || !newsletterMensagem) return;

  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!newsletterForm.checkValidity()) {
      newsletterForm.reportValidity();
      return;
    }

    newsletterMensagem.textContent = "Enviando seu cadastro...";
    newsletterBotao.disabled = true;

    const dadosFormulario = new FormData(newsletterForm);
    const dadosParaEnviar = new URLSearchParams();

    for (const [campo, valor] of dadosFormulario.entries()) {
      dadosParaEnviar.append(campo, valor);
    }

    try {
      await fetch(newsletterForm.action, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: dadosParaEnviar.toString(),
      });

      newsletterMensagem.textContent =
        "Obrigado! Seu e-mail foi cadastrado com sucesso.";

      newsletterForm.reset();
    } catch (erro) {
      newsletterMensagem.textContent =
        "Não foi possível enviar agora. Tente novamente.";
    } finally {
      newsletterBotao.disabled = false;
    }
  });
});