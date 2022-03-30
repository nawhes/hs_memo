#!/bin/bash
set -e

HS_DBNAME=hs_memo
HS_DBUSER=memo
HS_DBPASSWORD=memo

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
 
CREATE DATABASE $HS_DBNAME;
CREATE USER $HS_DBUSER WITH ENCRYPTED PASSWORD '$HS_DBPASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $HS_DBNAME TO $HS_DBUSER;

EOSQL

PGPASSWORD=memo psql -v ON_ERROR_STOP=1 --username "$HS_DBUSER" --dbname $HS_DBNAME <<-EOSQL

CREATE TABLE IF NOT EXISTS account (
    id              SERIAL PRIMARY KEY,
    userid          VARCHAR(20) UNIQUE NOT NULL,
    salted_pw       CHAR(64) NOT NULL,
    salt            CHAR(16) NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS memo (
    id              SERIAL PRIMARY KEY,
    userid          INTEGER CONSTRAINT FK_memo_account REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    head            VARCHAR(20) NOT NULL,
    body            TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comment (
    id              SERIAL PRIMARY KEY,
    userid          INTEGER CONSTRAINT FK_comment_account REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    memoid          INTEGER CONSTRAINT FK_comment_memo REFERENCES memo(id) ON DELETE CASCADE ON UPDATE CASCADE,
    body            TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session (
    id              VARCHAR PRIMARY KEY,
    max_age         BIGINT,
    userid          INTEGER,
    session         JSONB
);

CREATE OR REPLACE FUNCTION FNC_update_time() 
    RETURNS TRIGGER
AS \$func\$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END
\$func\$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER TRG_memo_updated_at
    BEFORE UPDATE
    ON memo FOR EACH ROW
    EXECUTE PROCEDURE FNC_update_time();

CREATE OR REPLACE TRIGGER TRG_comment_updated_at
    BEFORE UPDATE
    ON comment FOR EACH ROW
    EXECUTE PROCEDURE FNC_update_time();

EOSQL
