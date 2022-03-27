FROM    --platform=linux/amd64 postgres:14.2
LABEL   maintaner="nawhes@naver.com"

COPY    ./initialize_database.sh /docker-entrypoint-initdb.d
WORKDIR /home

CMD [ "postgres" ]