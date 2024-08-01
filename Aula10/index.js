const { createApp } = Vue;

createApp ({
    data() {
        return {
            nomes: [ {foto:"download.jpg", nome: "Fulano ", idade: 17, email: "fulano@gmail.com", expanded: false},
            {nome: "Ciclano ", idade: 49, email: "ciclano@gmail.com", expanded: false}, 
            {nome: "Beltrano ", idade: 21, email: "beltrano@gmail.com", expanded: false}, 
            {nome: "Tetrano ", idade: 77, email: "tetrano@gmail.com", expanded: false}, ]
        }
    },
    methods: {
       expandirItem(item) {
            item.expanded = !item.expanded;
            img
       }
    }
    
}).mount("#app");