# SENAC-PI-2025.2
Repositório para o projeto integrador do SENAC do grupo 12 do curso Análise e Desenvolvimento de Sistemas (EAD)

## Integrantes:
 - Fábio da Silveira da Cruz
 - Laura de oliveira
 - Rafael Gallo Casa
 - Samir Araripe
 - Thiago Marcelo Francisco Neves


# Introdução
Trazemos o EducaFlex, plataforma de acompanhamento escolar gameficado que te ajudará a se organizar assim como trazer o estudo com mais objetividade e constância.

## Executando o projeto
Todos os comandos executados aqui necessitam de ter o [docker](https://www.docker.com/) instalado em sua máquina.

Etapas de execução (caso queira visualizar)
### Banco de dados
`docker compose up db` que subirá um banco de dados postgres com as credenciais definidas no `docker-compose.yml` (caso já tenha a porta 5432 ocupada, necessário editar o arquivo)

### Backend API
`docker compose up backend` que subirá a api de dados (necessário ter a porta 8080 livre, caso necessite alterar, edite o arquivo docker-compose.yml)

### Frontend API
`docker compose up frontend`


## Fluxo de alimentação
O banco de dados sobe limpo, então precisamos inserir os primeiros dados dentro dele.  
No backend há o arquivo `run_db.py` de popular com os schemas e tabelas de início e, após a criação das tabelas, há o arquivo em `backend/scripts/sample_data.sql` com a inserção de alguns metadados.

### Criando primeiro usuário
Ao subir o banco e a api de backend, é possível acessar o swagger da api e criar o usuário teste.  
Caso não queira fazer via swager, há a possibilidade de criar no modelo:
```
curl -X 'POST' \
  'http://localhost:8000/v1/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "user",
  "email": "user@example.com",
  "password": "string",
  "role": "admin"
}'
```
### Login
A rota de login é necessária pra poder carregar o token de autenticação que deverá ser utilizado nas demais rotas.  
Pode ser feita manualmente ou via linha de comando caso queira:
```
curl -X POST "http://localhost:8000/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user4@example.com&password=string"
```
Dessa forma ela tem um retorno de:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyNEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsInVpZCI6NCwiZXhwIjoxNzYzNDI5MDM3fQ.cYCtR76cFG8y1tFu4Xf3NzVY_fBb1hMLXUX3FRc-J5U",
  "token_type": "bearer",
  "user": {
    "id": 4,
    "name": "esqueci",
    "email": "user4@example.com",
    "role": "admin"
  }
}
```
Esse "access_token" deve ser injetado ao header ou simplesmente passado uma vez que está autenticado.
