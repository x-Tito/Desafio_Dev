const dadosEstoque = {
    "estoque":
	[
	  {
		"codigoProduto": 101,
		"descricaoProduto": "Caneta Azul",
		"estoque": 150
	  },
	  {
		"codigoProduto": 102,
		"descricaoProduto": "Caderno Universitário",
		"estoque": 75
	  },
	  {
		"codigoProduto": 103,
		"descricaoProduto": "Borracha Branca",
		"estoque": 200
	  },
	  {
		"codigoProduto": 104,
		"descricaoProduto": "Lápis Preto HB",
		"estoque": 320
	  },
	  {
		"codigoProduto": 105,
		"descricaoProduto": "Marcador de Texto Amarelo",
		"estoque": 90
	  }
	]

}

let movimentacoes=[];
let proximoIdMovimentacao=1;

class SistemaEstoque{
    constructor(dados){        
        this.produtos = dados.estoque.reduce((acc, produto) => { 
            acc[produto.codigoProduto] = produto;
            return acc;
        }, {});
    }

    realizarMovimentacao(codigoProduto, tipoMovimento, quantidade, descricao){
        const produto = this.produtos[codigoProduto];
        const qtde = Math.abs(quantidade);

        if(!produto){
            console.error(`\n Erro: produto com código ${codigoProduto} não encontrado`);
            return null;
        }
        if (qtde<= 0){
            console.error('\n Erro: A quantidade deve ser maior que zero.');
            return null;
        }
        const tipo= tipoMovimento.toUpperCase();
        let novoEstoque= produto.estoque;

        if(tipo === "ENTRADA"){
            novoEstoque += qtde;
            console.log(`\n Entrada de ${qtde} de ${produto.descricaoProduto} registrada.`);
        } else if (tipo === "SAIDA"){
            if(produto.estoque<qtde){
                console.error(`\n Aviso: Não há estoque suficiente (${produto.estoque}) para a SAÍDA de ${qtde} de ${produto.descricaoProduto}.`)
                return null;
            }
            novoEstoque -= qtde;         
            produto.estoque=novoEstoque;

            const registroMovimento = {
            id: proximoIdMovimentacao++,
            codigoProduto: codigoProduto,
            descricaoProduto: produto.descricaoProduto,
            tipo: tipo,
            quantidade: qtde,
            descricao: descricao,
            data: new Date().toLocaleString(),
            estoqueFinal: novoEstoque
            };

            movimentacoes.push(registroMovimento);

            console.log(`\n ESTOQUE FINAL de ${produto.descricaoProduto} (Cód. ${codigoProduto}): **${novoEstoque}**`);
        return novoEstoque;
        }
    }
        exibirEstoque() {
        console.log('\n' + '-'.repeat(50));
        console.log('**ESTOQUE ATUAL**');
        console.log('-'.repeat(50));
        console.log('CÓD. | DESCRIÇÃO PRODUTO         | QTDE');
        console.log('-'.repeat(50));
        
        Object.values(this.produtos).forEach(p => {
            console.log(`${p.codigoProduto.toString().padEnd(4)} | ${p.descricaoProduto.padEnd(25)} | ${p.estoque}`);
        });
        console.log('-'.repeat(50));
    }

    exibirHistorico() {
        console.log('\n' + '#'.repeat(60));
        console.log('**HISTÓRICO DE MOVIMENTAÇÕES**');
        console.log('#'.repeat(60));
        if (movimentacoes.length === 0) {
            console.log('Nenhuma movimentação registrada.');
            console.log('#'.repeat(60));
            return;
        }

        movimentacoes.forEach(m => {
            console.log(`ID: ${m.id} | Data: ${m.data}`);
            console.log(`  Tipo: **${m.tipo.padEnd(7)}** | Cód: ${m.codigoProduto} - ${m.descricaoProduto}`);
            console.log(`  Descrição: ${m.descricao}`);
            console.log(`  Qtde Movimentada: ${m.quantidade} | Estoque Final: ${m.estoqueFinal}`);
            console.log('-'.repeat(60));
            });
        }
    }

    const gestor = new SistemaEstoque(dadosEstoque);

gestor.realizarMovimentacao(101, 'ENTRADA', 50, 'Compra de 50 canetas');
gestor.realizarMovimentacao(103, 'SAIDA', 10, 'Venda de 10 borrachas');

gestor.exibirEstoque();
gestor.exibirHistorico();