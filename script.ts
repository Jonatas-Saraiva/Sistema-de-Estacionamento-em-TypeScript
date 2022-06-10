interface Veiculo {
    nome:string,
    placa:string,
    entrada:Date | string,
}


(function (){
   const $ =(query:string):HTMLInputElement |null => document.querySelector(query); 
function  calcTempo(mil:number){
   const min = Math.floor(mil/60000);
   const seg = Math.floor((mil%60000)/1000); 

   return ` ${min}m e ${seg}s `
}

   function patio (){

 
function ler ():Veiculo[]{
return localStorage.patio ? JSON.parse(localStorage.patio):[];  //lembrando que local storage sempre cria arquivos em strigs,
                                                                  // ? se existir  LocalStorage.patio converte para JSON COM 
                                                                  //JSON.parse(localStorage.patio)  : se não retorna uma array vazia [];                                                                   
}

function salvar (veiculos:Veiculo[]){                             //localStorage(patio) seleciona  para depois converter 
    localStorage.setItem("#patio",JSON.stringify(veiculos))      //JSON.stringify converte de JSON para String
                                                              

} 
function adicionar (veiculo:Veiculo,salva?:boolean){
    const row = document.createElement("tr");

    row.innerHTML= `<divclass="nome"> Nome</div>
    <td class="vs" >${veiculo.nome}</td>
               <div class="placa"> Placa</div>
    <td class="vs" >${veiculo.placa}</td>
                <div class="entrada">Entrada</div>
    <td class="vs">${veiculo.entrada}</td>
    <td>
    <button class="delete" data-plac="${veiculo.placa}">X</button>
    
    </td>    
    `;
   
    row.querySelector(".delete")?.addEventListener('click', function (){
       remover(this.dataset.plac);
    }  );
 
 
    $("#patio")?.appendChild(row);
if(salva) salvar([ ...ler(), veiculo]);
};
function remover(placa: string) {
    const { entrada, nome }= ler().find(
        (veiculo) => veiculo.placa === placa
    );

    const tempo = calcTempo(
        new Date().getTime() - new Date(entrada).getTime()
    );

    if (
        !confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)
    )
        return;

    salvar(ler().filter((veiculo) => veiculo.placa !== placa));
    rende();
}


function rende(){
$("#patio")!.innerHTML="";                      //! força o typescript
                                               //    acessar as propriedades
                                              //  do innerhtml com a !   exclamação 
const patio = ler()

if(patio.length) {
patio.forEach((veiculo) => adicionar(veiculo));
}                                                              
}
return {ler , adicionar,remover , salvar,rende};
}
patio().rende()
   $("#cadastrar")?.addEventListener('click',()=>{
       const nome =$("#nome")?.value;
       const placa =$("#placa")?.value;

       if (!nome ||!placa){
           alert ("Os campos nome e placa são obrigatorios!")
           return;
       }
   patio().adicionar({nome,placa , entrada: new Date().toISOString()},true);
   
    });

})();