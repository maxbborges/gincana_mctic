# gincana-mctic

Como instalar:

git clone https://gitlab.com/maxbborges/gincana-mctic.git

cd /gincana

npm install

cordova platforms add browser

cordova plugin add cordova-plugin-qrscanner

cordova run browser

sudo apt-get install mysql-server

sudo service mysql start

sudo mysql

CREATE USER 'novousuario'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON * . * TO 'novousuario'@'localhost';

FLUSH PRIVILEGES;

mysql -u USUARIO -pSENHA DATABASE < ARQUIVO

sudo apt-get install php7.2 php7.2-mysql libapache2-mod-php7.2