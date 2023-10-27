function mostrarAndares(mostrar) {
    const andaresInput = document.getElementById('andaresInput');
    if (mostrar) {
        andaresInput.classList.add('show');
        andaresInput.classList.remove('hide');
    } else {
        andaresInput.classList.add('hide');
        andaresInput.classList.remove('show');
    }
}

function calcularPreco() {
    const metragem = parseFloat(document.getElementById('metragem').value);
    const tipoImovel = document.querySelector('input[name="tipoImovel"]:checked');
    const quartos = parseInt(document.getElementById('quartos').value);
    const andaresInput = document.getElementById('andaresInput');
    let andares = parseInt(document.getElementById('andares').value);

    if (andares === 0) {
        andares = 1;
    }

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = '';

    let preco;
    const resultadoDiv = document.getElementById('resultado');

    if (tipoImovel) {
        const tipoImovelValue = tipoImovel.value;
        if (tipoImovelValue === 'casa') {
            andaresInput.classList.add('hide');
            andaresInput.classList.remove('show');
            andares = 1;
        } else if (tipoImovelValue === 'apartamento' && quartos <= 3) {
            andaresInput.classList.add('show');
            andaresInput.classList.remove('hide');
        } else {
            errorMessage.innerText = 'Não permitido.';
            resultadoDiv.innerText = '';
            return;
        }

        preco = calcularImovel(metragem, quartos, tipoImovelValue, andares);
        resultadoDiv.innerText = `O preço do imóvel é: R$ ${preco.toFixed(2)}`;
    } else {
        errorMessage.innerText = 'Selecione o tipo de imóvel.';
        resultadoDiv.innerText = '';
    }
}

function calcularImovel(metragem, quartos, tipoImovel, andares) {
    const precoInicialPorMetroQuadrado = 3000;
    let preco;

    switch (true) {
        case quartos <= 0:
            preco = 0;
            break;
        case quartos <= 3:
            preco = metragem * precoInicialPorMetroQuadrado;
            break;
        default:
            preco = 0;
            break;
    }

    if (tipoImovel === 'apartamento') {
        preco *= (1 + andares * 0.1);
    }

    return preco;
}