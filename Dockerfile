#puxa a imagem do repositório no docker hub
FROM node

# setar a pasta atual de trabalho dentro da imagem
WORKDIR /usr/src

# copia os arquivos do seu pc para dentor da imagem(que depois vira o container)
COPY . .

EXPOSE 4000

# npm
RUN npm i && npm run build

# executa este comando quando o container estiver ativo e lindão
#CMD ["node", "start"];
CMD npm start 