FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=YourStrong!Passw0rd
ENV MYSQL_DATABASE=firewarden_db
ENV MYSQL_USER=warden_user
ENV MYSQL_PASSWORD=YourUser!Passw0rd
EXPOSE 3306
VOLUME ["/var/lib/mysql"]
