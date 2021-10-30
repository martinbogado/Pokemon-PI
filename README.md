<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


## Resultados
### Video presentacion del proyecto
[![Watch the video](https://user-images.githubusercontent.com/85038226/139535597-f7fbce6d-7e76-41a0-84c6-faaef82c0966.png)](https://vimeo.com/640672698)

<!-- ![webpage](https://user-images.githubusercontent.com/85038226/139119482-07547852-6a48-49b7-97de-e76735b1621d.png)

![details](https://user-images.githubusercontent.com/85038226/139119646-a4a5b09e-0601-4a93-ac25-27462af188b8.png)

![create pokemon](https://user-images.githubusercontent.com/85038226/139119921-ce0ad835-7529-47dc-a7dc-251fab2c6a2f.png)
 -->


## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons


### Requerimientos mínimos:


#### Tecnologías necesarias:
- [X] React
- [X] Redux
- [X] Express
- [X] Sequelize - Postgres

#### Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: deben armar una landing page con
- [X] Alguna imagen de fondo representativa al proyecto
- [X] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contener
- [X] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [X] Área donde se verá el listado de pokemons. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /pokemons` y deberá mostrar su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [X] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [X] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [X] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina, mostrando los primeros 9 en la primer pagina.


__Ruta de detalle de Pokemon__: debe contener
- [X] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [X] Número de Pokemon (id)
- [X] Estadísticas (vida, fuerza, defensa, velocidad)
- [X] Altura y peso

__Ruta de creación__: debe contener
- [X] Un formulario __controlado__ con los campos mencionados en el detalle del pokemon
- [X] Posibilidad de seleccionar/agregar más de un tipo de pokemon
- [X] Botón/Opción para crear un nuevo pokemon

#### Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [X] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
  - Nombre *
  - Vida
  - Fuerza
  - Defensa
  - Velocidad
  - Altura
  - Peso
- [X] Tipo con las siguientes propiedades:
  - ID
  - Nombre

#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

- [X] __GET /pokemons__:
  - Obtener un listado de los pokemons desde pokeapi.
  - Debe devolver solo los datos necesarios para la ruta principal
- [X] __GET /pokemons/{idPokemon}__:
  - Obtener el detalle de un pokemon en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de pokemon
  - Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
- [X] __GET /pokemons?name="..."__:
  - Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
  - Si no existe ningún pokemon mostrar un mensaje adecuado
- [X] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos
- [X] __GET /types__:
  - Obtener todos los tipos de pokemons posibles
  - En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

