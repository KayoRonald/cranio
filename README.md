<div align="center">
    <img src="https://github.com/josejefferson/cranio/blob/main/public/img/icon.png?raw=true" alt="Logo">
</div>

# 💀 O Crânio

O "Crânio" é um sistema de mural de avisos eletrônicos desenvolvido especificamente para o IFPB. Além de servir como um mural informativo, o Crânio oferece aos alunos a oportunidade de participar de um jogo de perguntas integrado, onde podem responder às questões e, a critério do professor, ter a chance de ganhar recompensas.

Este projeto foi concebido por um professor do campus com a ideia de executá-lo em uma Raspberry Pi, conectada a um monitor e um teclado numérico. Isso permite que os alunos visualizem os avisos no mural e interajam facilmente com o jogo de perguntas. Quando um aluno responde a uma pergunta corretamente, o sistema envia automaticamente um e-mail ao professor notificando-o da resposta correta.

## 👨‍💻 Autores

- [@josejefferson](https://github.com/josejefferson)
- [@KayoRonald](https://github.com/KayoRonald)

## 🔑 Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env**

`MONGO_DB` - _Connection string_ do MongoDB

`GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_EMAIL`, `GMAIL_REFRESH_TOKEN` - Credenciais do Gmail

## 📖 Documentação da API

> **Note**
> Algumas chamadas de API podem requerer um cabeçalho de autenticação!

#### Retorna todos os anúncios ativos

```http
GET /highlights/active
```

#### Retorna um desafio para um determinado estudante

```http
GET /challenges/start/:registration
```

| Parâmetro      | Tipo     | Descrição                               |
| :------------- | :------- | :-------------------------------------- |
| `registration` | `string` | **Obrigatório**. Matrícula do estudante |

#### Verifica se a resposta está correta

```http
POST /challenges/check
```

| Parâmetro             | Tipo     | Descrição                                    |
| :-------------------- | :------- | :------------------------------------------- |
| `studentRegistration` | `string` | **Obrigatório**. Matrícula do estudante      |
| `challengeID`         | `string` | **Obrigatório**. ID do desafio               |
| `choiceID`            | `string` | **Obrigatório**. ID da alternativa escolhida |

#### Retorna os dados de um estudante

```http
GET /students/find/:registration
```

| Parâmetro      | Tipo     | Descrição                               |
| :------------- | :------- | :-------------------------------------- |
| `registration` | `string` | **Obrigatório**. Matrícula do estudante |

## 🚀 Rodando localmente

#### Clone o projeto

```bash
git clone https://github.com/josejefferson/cranio
```

#### Entre no diretório do projeto

```bash
cd cranio
```

#### Instale as dependências

```bash
yarn
```

#### Faça o build

```bash
yarn build
```

#### Inicie o servidor

```bash
yarn start
```

## 💿 Tecnologias utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## 🗨 Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio do [formulário](https://forms.gle/3XdA6TizDNp8yosu9).
