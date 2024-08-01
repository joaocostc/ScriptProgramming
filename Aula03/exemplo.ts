namespace repeticao 
{
    let life: number = 100;
    let atkBoss: number = 5;
    let atkHero: number = 2;
    let lifeBoss: number = 1000;

    while (life != 0) {
        console.log("O Boss atacou o heroi!");
        life -= atkBoss;
        if (life <= 0){
            break;
        }
    }

    do {
        console.log("O heroi atacou o Boss!");
        lifeBoss -= atkHero;
    } while (lifeBoss >= 0)

    do {
        console.log("O heroi se curou!")
        life += 20;
    } while (life <= 50)

    for (let i = 0; i <= 10; i++){
        console.log("O heroi subiu de nível! \nNível: " + i);
    }

    // O número primo é um número que tem dois divisores, só divide por 1 e por ele mesmo
}