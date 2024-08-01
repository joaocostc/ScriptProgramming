const { createApp } = Vue; // Importa a função "createApp" do Vue

createApp({
    data() {
        return {
            digimons: [], // Array para armazenar os Digimons
            loading: true, // Flag para controlar o estado de carregamento
            searchText: '', // Texto de pesquisa
            searchLevel: 'name', // Tipo de pesquisa padrão ('name' para nome, 'level' para nível)
            nextPage: 1, // Página para a próxima consulta na API
        }
    },
    computed: {
        filteredDigimons() {
            // Filtra os Digimons com base no texto de pesquisa e no tipo de pesquisa selecionado
            return this.digimons.filter(digimon => digimon[this.searchLevel].toLowerCase().includes(this.searchText.toLowerCase()));
        },
        searchPlaceholder() {
            // Determina o texto de espaço reservado da barra de pesquisa com base no tipo de pesquisa selecionado
            return this.searchLevel === 'level' ? 'Busque um Digimon pelo Nível' : 'Busque um Digimon pelo Nome';
        }
    },
    created() {
        // Método executado quando o componente é criado
        this.fetchDigimons(); // Chama a função para buscar os Digimons
        window.addEventListener('scroll', this.handleScroll); // Adiciona um listener para o evento de scroll
    },
    beforeDestroy() {
        // Método executado antes do componente ser destruído
        window.removeEventListener('scroll', this.handleScroll); // Remove o listener para o evento de scroll
    },
    methods: {
        async fetchDigimons() {
            try {
                // Constrói a URL com base no texto de pesquisa e no tipo de pesquisa selecionado   
                const url = this.searchText.length < 2 ?  // Verifica se o comprimento do texto de pesquisa é inferior a 2 caracteres
                    `https://digimon-api.vercel.app/api/digimon?offset=${(this.nextPage - 1) * 60}` : // Se o texto de pesquisa for curto, constrói uma URL para buscar todos os Digimons com um deslocamento apropriado
                    `https://digimon-api.vercel.app/api/digimon/${this.searchLevel}/${this.searchText}`; // Se o texto de pesquisa for longo o suficiente, constrói uma URL para buscar Digimons com base no texto e no tipo de pesquisa selecionado
                // Faz uma requisição à API
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json(); // Converte a resposta para JSON
                // Mapeia os detalhes dos primeiros 60 Digimons retornado pela API
                const digimonDetails = data.slice(0, 60).map(digimon => ({ // Essa API não aceita o parâmetro "limit" diretamente na URL, por isso foi utilizado o "slice" para limitar a quantidade de dados exibidos por vez
                    name: digimon.name, // Atribui o nome do Digimon ao campo 'name' no objeto resultante
                    img: digimon.img, // Atribui a URL da imagem do Digimon ao campo 'img' no objeto resultante
                    level: digimon.level, // Atribui o nível do Digimon ao campo 'level' no objeto resultante
                    showDetails: true, // Define o campo 'showDetails' como verdadeiro para indicar que os detalhes do Digimon estão visíveis
                }));
                this.digimons = digimonDetails; // Atualiza a lista de Digimons
                this.loading = false; // Define o estado de carregamento como falso
            } catch (error) {
                console.error(error); // Registra erros no console
                this.loading = false; // Define o estado de carregamento como falso em caso de erro
            }
        },
        handleScroll() {
            // Função para lidar com o evento de scroll
            const bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight ===
                document.documentElement.offsetHeight;
            if (bottomOfWindow && !this.loading) {
                // Verifica se o usuário chegou ao fim da página e não está carregando mais dados
                this.loading = true; // Define o estado de carregamento como verdadeiro
                this.fetchDigimons(); // Busca mais Digimons
            }
        },
        getLevelClass(level) {
            // Função para retornar a classe de estilo com base no nível do Digimon
            const levelClassMap = {
                "In Training": 'InTraining',
                "Rookie": 'Rookie',
                "Champion": 'Champion',
                "Ultimate": 'Ultimate',
                "Fresh": 'Fresh',
                "Mega": 'Mega',
                "Training": 'Training',
                "Armor": 'Armor',
            };
            return levelClassMap[level] || ''; // Retorna a classe correspondente ou uma string vazia se não houver correspondência
        },
        updateSearchText() {
            // Função para atualizar o texto de pesquisa
            this.nextPage = 1; // Reinicia a página para a próxima consulta
            this.digimons = []; // Limpa a lista de Digimons
            this.fetchDigimons(); // Busca os Digimons com base no novo texto de pesquisa
        }
    },
    watch: {
        searchText: {
            // Observador para o texto de pesquisa
            handler() {
                this.nextPage = 1; // Reinicia a página para a próxima consulta
                this.digimons = []; // Limpa a lista de Digimons
                this.fetchDigimons(); // Busca os Digimons com base no novo texto de pesquisa
            },
            immediate: true // Chama o manipulador imediatamente após a criação do componente
        },
        searchLevel() {
            // Observador para o tipo de pesquisa
            this.nextPage = 1; // Reinicia a página para a próxima consulta
            this.digimons = []; // Limpa a lista de Digimons
            this.fetchDigimons(); // Busca os Digimons com base no novo tipo de pesquisa
        }
    }
}).mount("#app"); // Monta o aplicativo na tag div que contém o id "app"