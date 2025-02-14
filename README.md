# Pokémon API App

![Exemplo de execução](./image/image.png)

## Descrição
Este projeto é um aplicativo web que permite buscar informações sobre Pokémon utilizando a PokeAPI. O usuário pode buscar Pokémon aleatórios ou pesquisar manualmente por nome. A aplicação foi construída utilizando Node.js, Express, axios, e body-parser.

## Tecnologias Utilizadas
- **Node.js**: Plataforma para construção de aplicações web.
- **Express**: Framework para facilitar a criação de servidores HTTP.
- **Axios**: Cliente HTTP para fazer requisições à PokeAPI.
- **Body-parser**: Middleware para processar dados de formulários.
- **PokeAPI**: API externa para obter dados dos Pokémon. [Documentação da PokeAPI](https://pokeapi.co/)
- **Imagens dos Pokémon**: Utiliza o repositório [Pokedex HTML JS](https://github.com/wellrccity/pokedex-html-js) para imagens.

## Aprendizado
- Aprendizado sobre a integração de APIs externas usando axios.
- Criação de rotas em Express.
- Uso de body-parser para lidar com dados de formulários.
- Manipulação de JSON para exibição de dados dinâmicos.
- Compreensão do conceito de busca por parâmetros de URL.

## Funcionalidades
- **Busca Aleatória**: Ao acessar a página inicial, o usuário pode visualizar informações de um Pokémon aleatório.
- **Busca Manual**: O usuário pode procurar por Pokémon específicos da lista pré-definida inserindo o nome desejado.
- **Exibição de Dados**: O aplicativo exibe informações detalhadas do Pokémon, como nome, altura, peso e imagem.

## Exemplo de Execução
1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm start` para rodar o servidor.
4. Acesse `http://localhost:3000` no seu navegador.
5. Para buscar um Pokémon aleatório, clique em "Buscar Pokémon Aleatório".
6. Para buscar um Pokémon manualmente, insira o nome desejado na barra de pesquisa e envie o formulário.
