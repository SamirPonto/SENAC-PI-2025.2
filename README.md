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
