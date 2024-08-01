const { createApp } = Vue; // Importa a função createApp do Vue

createApp({ // Cria a aplicação Vue
    data() { // Define os dados da aplicação
        return { // Retorna um objeto com os dados
            heroi: { // Objeto representando o herói
                vida: 100, // Vida inicial do herói
                imagemAtaque: 'assets/img/atacarHeroi.gif', // Imagem do herói para o ataque
                imagemDefesa: 'assets/img/defenderHeroi.gif', // Imagem do herói para a defesa
                imagemPocao: 'assets/img/pocaoHeroi.gif', // Imagem do herói para usar poção
                imagemCorrer: 'assets/img/correrHeroi.gif', // Imagem do herói para correr
            },
            vilao: { // Objeto representando o vilão
                vida: 100, // Vida inicial do vilão
                imagemAtaque: 'assets/img/atacarVilao.gif', // Imagem do vilão para o ataque
                imagemDefesa: 'assets/img/defenderVilao.gif', // Imagem do vilão para a defesa
                imagemPocao: 'assets/img/pocaoVilao.gif', // Imagem do vilão para usar poção
                imagemCorrer: 'assets/img/correrVilao.gif', // Imagem do vilão para correr
            },
            jogoFinalizado: false // Indicador se o jogo está finalizado
        }
    },
    methods: { // Define os métodos da aplicação
        // Método para atacar
        atacar(isHeroi) { 
            // Se o herói estiver atacando
            if (isHeroi) {
                // Reduz a vida do vilão em 10
                this.vilao.vida -= 10;
                // Garante que a vida do vilão não seja menor que 0
                this.vilao.vida = this.vilao.vida < 0 ? 0 : this.vilao.vida;
                // Define a imagem do herói para ataque
                this.heroi.imagem = this.heroi.imagemAtaque;
                // Se o jogo não estiver finalizado, executa a ação do vilão
                if (!this.jogoFinalizado) {
                    this.acaoVilao();
                }
            } else { // Se o vilão estiver atacando
                // Reduz a vida do herói em 25
                this.heroi.vida -= 25;
                // Garante que a vida do herói não seja menor que 0
                this.heroi.vida = this.heroi.vida < 0 ? 0 : this.heroi.vida;
                // Define a imagem do vilão para ataque
                this.vilao.imagem = this.vilao.imagemAtaque;
            }
            // Verifica se o jogo chegou ao fim após a ação
            this.verificaFimDeJogo();
        },
        // Método para defender
        defender(isHeroi) {
            // Se o herói estiver defendendo
            if (isHeroi) {
                // Reduz a vida do herói em 5
                this.heroi.vida -= 5;
                // Define a imagem do herói para defesa
                this.heroi.imagem = this.heroi.imagemDefesa;
                // Se o jogo não estiver finalizado, executa a ação do vilão
                if (!this.jogoFinalizado) {
                    this.acaoVilao();
                }
            } else { // Se o vilão estiver defendendo
                // Reduz a vida do vilão em 5
                this.vilao.vida -= 5;
                // Define a imagem do vilão para defesa
                this.vilao.imagem = this.vilao.imagemDefesa;
            }
            // Verifica se o jogo chegou ao fim após a ação
            this.verificaFimDeJogo();
        },        
        // Método para usar poção
        usarPocao(isHeroi) {
            // Se o herói estiver usando poção
            if (isHeroi) {
                // Aumenta a vida do herói em 20
                this.heroi.vida += 20;
                // Garante que a vida do herói não ultrapasse 100
                this.heroi.vida = this.heroi.vida > 100 ? 100 : this.heroi.vida;
                // Define a imagem do herói para usar poção
                this.heroi.imagem = this.heroi.imagemPocao;
                // Se o jogo não estiver finalizado, executa a ação do vilão
                if (!this.jogoFinalizado) {
                    this.acaoVilao();
                }
            } else { // Se o vilão estiver usando poção
                // Aumenta a vida do vilão em 10
                this.vilao.vida += 10;
                // Garante que a vida do vilão não ultrapasse 100
                this.vilao.vida = this.vilao.vida > 100 ? 100 : this.vilao.vida;
                // Define a imagem do vilão para usar poção
                this.vilao.imagem = this.vilao.imagemPocao;
            }
            // Verifica se o jogo chegou ao fim após a ação
            this.verificaFimDeJogo();
        },
        // Método para correr
        correr(isHeroi) {
            // Se o herói estiver tentando correr
            if (isHeroi) {
                // Se a vida do herói for menor ou igual a 20
                if (this.heroi.vida <= 20) {
                    // Reduz a vida do herói em 5
                    this.heroi.vida -= 5;
                    // Garante que a vida do herói não ultrapasse 100
                    this.heroi.vida = this.heroi.vida > 100 ? 100 : this.heroi.vida;
                    // Define a imagem do herói para correr
                    this.heroi.imagem = this.heroi.imagemCorrer;
                }
                // Define a imagem do herói para correr
                this.heroi.imagem = this.heroi.imagemCorrer;
                // Define a imagem do vilão para correr
                this.vilao.imagem = this.vilao.imagemCorrer;
                // Se o jogo não estiver finalizado, executa a ação do vilão
                if (!this.jogoFinalizado) {
                    this.acaoVilao();
                }
            }
            // Verifica se o jogo chegou ao fim após a ação
            this.verificaFimDeJogo();
        },        
        // Método para gerar ação do vilão
        acaoVilao() {
            // Array com as ações possíveis do vilão
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            // Seleciona aleatoriamente uma ação do vilão
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            // Executa a ação selecionada do vilão
            this[acaoAleatoria](false);
        },
        // Método para verificar o fim do jogo
        verificaFimDeJogo() {
            // Se a vida do herói for menor ou igual a 0, o jogo acaba e o herói perde
            if (this.heroi.vida <= 0) {
                alert('Game Over!');
                // Reseta a ação aleatória do vilão
                this.reiniciarJogo();
            // Se a vida do vilão for menor ou igual a 0, o jogo acaba e o herói vence
            } else if (this.vilao.vida <= 0) {
                alert('Game Win!');
                // Reinicia o jogo
                this.reiniciarJogo();
            }
        },
        // Método para reiniciar o jogo
        reiniciarJogo() {
            // Reseta a vida do herói e do vilão para 100
            this.heroi.vida = 100; 
            this.vilao.vida = 100;
            // Reseta as imagens do herói e do vilão
            this.heroi.imagem = null;
            this.vilao.imagem = null;
            // Define que o jogo não está finalizado
            this.jogoFinalizado = false;
        }
    }
}).mount('#app'); // Monta a aplicação Vue no elemento HTML com o id 'app'