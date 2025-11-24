# Usamos a imagem oficial e leve do Nginx
FROM nginx:alpine

# Removemos o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos o arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos todos os arquivos da sua pasta 'frontend' para o diretório de serviço do Nginx
# O '.' representa a pasta 'frontend'
COPY . /usr/share/nginx/html

# A porta 80 é a porta padrão que o Nginx usa no container
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]