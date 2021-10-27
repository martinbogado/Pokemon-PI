

export default function validate(input, pokemons){
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;  

    if(!input.name){
        errors.name = 'A name is required'
    }
    if(pokemons.indexOf( input.name ) !== -1){
        errors.name = 'A pokemon with that name is already existing'
    }
    if(!RegExpression.test(input.name)){
        errors.name = 'Numbers or special characters are not allowed'
    }
    if(input.name.length > 18){
        errors.name = `The name can't be longer than 18 characters`
    }

    if(input.hp < 1 || input.hp > 150){
        if(input.hp < 1 ){
            errors.hp = 'The life of the Pokemon must be higher than 1'
        }
        if( input.hp > 150){
            errors.hp = 'The life of the Pokemon must be less than 150'
        } 
    }
    if(input.attack < 1 || input.attack > 200){
        if(input.attack < 1 ){
            errors.attack = 'The attack of the Pokemon must be higher than 1'
        }
        if( input.attack > 200){
            errors.attack = 'The attack of the Pokemon must be less than 200'
        } 
    }
    if(input.defense < 1 || input.defense > 200){
        if(input.defense < 1 ){
            errors.defense = 'The defense of the Pokemon must be higher than 1'
        }
        if( input.defense > 200){
            errors.defense = 'The defense of the Pokemon must be less than 200'
        } 
    }
    if(input.speed < 1 || input.speed > 100){
        if(input.speed < 1 ){
            errors.speed = 'The speed of the Pokemon must be higher than 1'
        }
        if( input.speed > 100){
            errors.speed = 'The speed of the Pokemon must be less than 100'
        } 
    }
    if(input.weight < 1 || input.weight > 1500){
        if(input.weight < 1 ){
            errors.weight = 'The weight of the Pokemon must be higher than 1'
        }
        if( input.weight > 1500){
            errors.weight = 'The weight of the Pokemon must be less than 1500'
        } 
    }
    if(input.height < 1 || input.height > 80){
        if(input.height < 1 ){
            errors.height = 'The height of the Pokemon must be higher than 1 dam'
        }
        if( input.height > 80){
            errors.height = 'The height of the Pokemon must be less than 80 dam'
        } 
    }

    if(!input.types.length){
        errors.types = 'Must choose a pokemon type'
    }
    if(input.types.length > 2){
        errors.types = `You can't choose more than 2 types per Pokemon`
    }
    
    return errors;
}