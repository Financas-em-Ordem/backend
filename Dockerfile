# Use uma imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY . .

RUN rm -rf node_modules package-lock.json

# Instale as dependências do projeto
RUN npm install

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
