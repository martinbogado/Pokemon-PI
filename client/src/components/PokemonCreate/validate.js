

export default function validate(input, pokemons){
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;  

    if(!input.name){
        errors.name = 'Se requiere un nombre'
    }
    if(pokemons.indexOf( input.name ) !== -1){
        errors.name = 'Ya existe un pokemon con ese nombre'
    }
    if(!RegExpression.test(input.name)){
        errors.name = 'No se permiten numeros o caracteres especiales'
    }
    if(input.name.length > 18){
        errors.name = 'El nombre no puede tener mas de 18 caracteres'
    }

    if(input.hp < 1 || input.hp > 150){
        errors.hp = 'La vida del Pokemon debe ser menor a 150'
    }
    if(input.attack < 1 || input.attack > 120){
        errors.attack = 'El poder de ataque del Pokemon debe ser menor a 120'
    }
    if(input.defense < 1 || input.defense > 120){
        errors.defense = 'La defensa del Pokemon debe ser menor a 120'
    }
    if(input.speed < 1 || input.speed > 100){
        errors.speed = 'La velocidad del Pokemon debe ser menor a 100'
    }
    if(input.weight < 1 || input.weight > 1500){
        errors.weight = 'El peso del Pokemon debe ser menor a 1500g'
    }
    if(input.height < 1 || input.height > 100){
        errors.height = 'La altura del Pokemon debe ser menor a 100'
    }

    if(!input.types.length){
        errors.types = 'Debe elegir alguna clase'
    }
    if(input.types.length > 2){
        errors.types = 'No puede elegir mas de 2 tipos por Pokemon'
    }
    
    return errors;
}