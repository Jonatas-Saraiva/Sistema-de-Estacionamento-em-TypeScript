(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const seg = Math.floor((mil % 60000) / 1000);
        return ` ${min}m e ${seg}s `;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : []; //lembrando que local storage sempre cria arquivos em strigs,
            // ? se existir  LocalStorage.patio converte para JSON COM 
            //JSON.parse(localStorage.patio)  : se não retorna uma array vazia [];                                                                   
        }
        function salvar(veiculos) {
            localStorage.setItem("#patio", JSON.stringify(veiculos)); //JSON.stringify converte de JSON para String
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `<divclass="nome"> Nome</div>
    <td class="vs" >${veiculo.nome}</td>
               <div class="placa"> Placa</div>
    <td class="vs" >${veiculo.placa}</td>
                <div class="entrada">Entrada</div>
    <td class="vs">${veiculo.entrada}</td>
    <td>
    <button class="delete" data-plac="${veiculo.placa}">X</button>
    
    </td>    
    `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.plac);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        ;
        function remover(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            rende();
        }
        function rende() {
            $("#patio").innerHTML = ""; //! força o typescript
            //    acessar as propriedades
            //  do innerhtml com a !   exclamação 
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, rende };
    }
    patio().rende();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatorios!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
