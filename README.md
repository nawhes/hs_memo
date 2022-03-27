# hs_memo

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-Start)
3. [Environment](#development-environment)
4. [API](#api)
5. [References](#references)

## Prerequisites

### Docker
개발환경에 필요한 데이터베이스는 Docker 컨테이너를 이용해서 구성되있습니다.

운영체제에 맞는 Docker를 설치해주세요.

https://www.docker.com/products/docker-desktop/

Docker 컨테이너를 가동시키는 데 필요한 docker-compose를 설치해주세요.

https://docs.docker.com/compose/install/

리눅스기반의 운영체제에서 docker는 기본적으로 root권한이 필요합니다. 

root가 아닌 사용자가 sudo없이 사용하려면 해당 사용자를 docker그룹에 추가합니다.
```
sudo usermod -aG docker $USER # 현재 접속중인 사용자에게 권한주기
sudo usermod -aG docker your-user # your-user 사용자에게 권한주기
```

### Nodejs
프로젝트의 런타임인 nodejs와 npm을 설치해주세요.

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Quick Start
### 프로젝트를 시작하기 전
프로젝트에 사용되는 환경변수는 .env와 .env.dev에 정의되있습니다.

DB_PORT : Docker 컨테이너와 통신하기 위한 포트번호입니다.
PORT : 애플리케이션이 수신할 포트번호입니다.

각자의 실행환경에 맞게 해당 환경변수를 확인해주세요.


프로젝트의 루트 디렉토리에서 아래 스크립트를 실행해주세요.
```
npm run init
```
해당 스크립트는 프로젝트의 의존성들과 Docker 이미지를 설치한 뒤
Docker 컨테이너를 가동시키는 동작을 합니다.

### 프로젝트를 시작
프로젝트의 루트 디렉토리에서 아래 스크립트를 실행해주세요.
```
npm run dev
```


## Development Environment

-   OS : Ubuntu 20.04.2 LTS 64-bit
-   node.js : 14.18.2
-   npm : 7.20.2
-   docker : 20.10.12
-   docker-compose : 1.29.2
-   postgresql : 14.2

## API

#### 메모 조회

-   최근에 작성된 메모부터 5개 단위로 조회합니다.

##### URL

```
GET /api/memo
```

##### Parameter

|             | Name     | Type | Description | Required |
| ----------- | -------- | ---- | ----------- | -------- |
| QueryString | page   | number | 조회하고자 하는 페이지 | X        |


#### 메모 상세 조회

##### URL

```
GET /api/memo/:memoId
```

|     | Name   | Type   | Description   | Required |
| --- | ------ | ------ | ------------- | -------- |
| URL | memoId | number | 조회할 메모의 ID | O        |

#### 메모 등록

##### URL

```
POST /api/memo
```

##### Parameter

|            | Name         | Type   | Description   | Required |
| ---------- | ------------ | ------ | ------------- | -------- |
| body(JSON) | body         | string | 메모의 내용     | O        |


#### 메모 수정

##### URL

```
PUT /api/memo/:memoId
```

##### Parameter

|            | Name         | Type   | Description       | Required |
| ---------- | ------------ | ------ | ----------------- | -------- |
| URL        | memoId       | number | 수정할 메모의 ID    | O        |
| body(JSON) | body         | string | 메모의 내용         | X        |

#### 메모 삭제

##### URL

```
DELETE /api/memo/:memoId
```

##### Parameter

|            | Name         | Type   | Description       | Required |
| ---------- | ------------ | ------ | ----------------- | -------- |
| URL        | memoId       | number | 삭제할 메모의 ID    | O        |

#### 회원가입

##### URL

```
POST /api/user/signup
```

##### Parameter

|            | Name         | Type   | Description       | Required |
| ---------- | ------------ | ------ | ----------------- | -------- |
| body(JSON) | id           | string | id제약조건 나열      | O        |
|            | pw           | string | 평문 or hashed?    | O        |

#### 로그인

##### URL

```
POST /api/user/signin
```

##### Parameter

|            | Name         | Type   | Description       | Required |
| ---------- | ------------ | ------ | ----------------- | -------- |
| body(JSON) | id           | string | id제약조건 나열      | O        |
|            | pw           | string | 평문 or hashed?    | O        |


## References

https://softwareontheroad.com/nodejs-scalability-issues/

