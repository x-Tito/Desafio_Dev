function calcularJuros(valorOriginal, dataVencimento, dataAtual, taxaDiaria= 2.5){
    dataVencimento= new Date(dataVencimento);
    dataAtual= new Date(dataAtual);
    dataVencimento.setHours(0,0,0,0);
    dataAtual.setHours(0,0,0,0);

    if (dataAtual <= dataVencimento){
        console.log(`Não há atrasos, pagamento em dia ou antecipado.`);
        return0;
    }

    const diferencaEmMilisegundos= dataAtual.getTime() - dataVencimento.getTime();
    const msPorDia = 1000*60*60*24;

    const diasAtrasos= Math.ceil(diferencaEmMilisegundos/msPorDia);
    const taxaTotal = (taxaDiaria/100)* diasAtrasos;
    const valorjuros = valorOriginal* taxaTotal;

    console.log(`-------Pagamentos-------`);
    console.log(`Valor original: ${valorOriginal.toFixed(2)}`);
    console.log(`Data de vencimento: ${dataVencimento.toLocaleDateString('pt-BR')}`);
    console.log(`Data de hoje: ${dataAtual.toLocaleDateString('pt-BR')}`);
    console.log(`Dias de atrasos: ${diasAtrasos} dias.`);
    console.log(`Multa diária: ${taxaDiaria}%`);
    console.log(`Taxa acumulada: ${(taxaTotal*100).toFixed(2)}%`);
    console.log(`Valor da multa: R$ ${valorjuros.toFixed(2)}`);
    console.log(`Total a Pagar: R$ ${(valorOriginal+valorjuros).toFixed(2)}`);
    console.log(`-`.repeat(25));

    return parseFloat(valorjuros.toFixed(2));
}

const valorBase = 100.00;
const vencimento1= '2025-11-30';
const hoje1 = '2025-12-05';
const multa1 = 2.5;

calcularJuros(valorBase, vencimento1, hoje1, multa1);