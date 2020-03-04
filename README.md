# gincana-mctic
- Instalar o Docker

        $ git clone https://gitlab.com/maxbborges/projetosdocker

- Entrar na pasta clonada e na pasta do projeto

        $ docker image build -t NOME_IMAGEM .
        $ docker run -d -P -p X:80 -p X:8000 -p X:90 -p X:3001 -v "$PWD/:/home/maxwell/projetos" --name NOME_PROJETO NOME_IMAGEM
        $ docker exec -it -u maxwell [nome do container] bin/bash
        
- Acesar a pasta do usuário

        $ git clone https://gitlab.com/maxbborges/gincana-mctic.git OU ACESSAR A PASTA CLONADA 
        $ cd gincana-mctic/gincana
        $ npm install
        $ cordova platforms add browser
        $ cordova run browser OU $ cordova run --live-reload
        
- Configurar MYSQL
        
        $ sudo mysql
 
        CREATE USER 'maxwell'@'localhost' IDENTIFIED BY '123456';
        GRANT ALL PRIVILEGES ON * . * TO 'maxwell'@'localhost';
        FLUSH PRIVILEGES;
        exit

- Acessar a pasta gingacana_mctic
    - Popular o banco
        
        $ mysql -u maxwell -p123456 gincana_mctic < sql_gincana_mctic.sql
        $ mysql -p123456
        

- Configurar APACHE2

        $ sudo nano /etc/apache2/sites-enabled/000-default.conf

        DocumentRoot /home/maxwell/gincana-mctic/gincana_server
            
        <Directory /home/maxwell/gincana-mctic/gincana_server>
            AllowOverride none 
            Require all granted
        </Directory>
        
        $ sudo service apache2 restart