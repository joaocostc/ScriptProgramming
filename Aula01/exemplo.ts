namespace HelloWorld 
{    
    // Escreva
    console.log("Olá, Mundo!!!");

    // var (Variável Pública), let (Variável Privada) e const (Constante)

    var status: string = "Atacou";
    let qtd: number = 5;

    console.log(`O Boss ${status} ${qtd} vezes.`)
    let vidaHeroi: number = 100;
    console.log(`O herói ficou com ${vidaHeroi - (qtd * 2)} de vida.`);
}