namespace vetores 
{
    let numeros: number [] = [1, 2, 3, 4, 5];
    let frutas: Array <string> = ["Morango", "Laranja", "Kiwi"];
    
    type Livro = {
        titulo: string;
        autor: string;
        ano: number;
    }

    let livros:Livro[] = [{ // Array com objeto do tipo Livro (Dicionário)
        titulo: "Senhor dos Anéis",
        autor: "JJ R Jubileu",
        ano: 1954,
    },
    {
        titulo: "Harry Potter",
        autor: "J K Rowling",
        ano: 1995,
    }]

    console.log(numeros[0]);
    console.log(numeros[1]);
    console.log(numeros[2]);
    for (let i = 0; i < numeros.length; i++){
        console.log(numeros[i])
    }

    // Adicionando elementos no final do array (última posição)
    numeros.push(6);

    // Remover o último elemento do array (última posição)
    numeros.pop();

    // Adicionando elemento no começo do array (primeira posição)
    numeros.unshift(0);

    // Removendo o primeiro elemento do array (primeira posição)
    numeros.shift();

    livros.forEach(livro => {
        console.log(`${livro.titulo}\n${livro.autor}\n${livro.ano}`);
    });

    let quadrados = numeros.map(function (num){// Se não fazer a tipagem, ele fica do tipo N (Anything)
        return num * num;
    }); 

    console.log(quadrados);

    let pares:number[] = numeros.filter(function(num){
        return num % 2 === 0;
    });

    console.log(pares);

    let soma:number = numeros.reduce(function(total, num){
        return total + num;
    });

    console.log(soma)
}