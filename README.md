# commerce

[프로젝트 개발 환경](#프로젝트-개발-환경)

- [개발환경](#개발환경)
- [USED PORT](#used-port)
- [DB](#db)

[프로젝트 실행 방법](#프로젝트-실행-방법)

[API](#api)

- [items](#items)
- [options](#options)
- [payment](#payment)
- [paymethod](#paymethod)

## 프로젝트 개발 환경

### 개발환경

- NodeJS: v.18.19.1 (docker image: node:18.19.1-alpine )
- NestJs: v.9.0.0
- TypeORM: v.0.3.20
- PostgreSql: v.14.12 (docker image: postgres:14.12-alipine3.20)
- docker: v.24.0.6

### USED PORT

Default 포트가 사용중일 수 있어 포트 변경

- api: 3001
- postgres: 5430

### DB

#### DB config

```
user: admin,
password: password,
database: commerce,
host: localhost,
port: 5430,
```

- users
  - 유저 테이블 (기본 유저 자동생성)
- items
  - 상품 테이블 (기본 상품 자동생성 - macbook, odyssey)
- item_options
  - 상품 옵션 테이블 (기본 옵션 자동 생성 - 각 상품 별 red, blue)
- pay_method
  - 결제 수단 테이블 (기본 결제 수단 자동 생성)
- payment
  - 구매 테이블
- payment_detail
  - 구매 상세 테이블

## 프로젝트 실행 방법

참조: github link - <https://github.com/ParkManHee/commerce/tree/main>

1. 프로젝트
2. docker 설치
3. docker network 를 생성 `docker network create commerce`
4. docker compose 실행 `docker compose up -d`

## API

참조: swagger link - <localhost:3001/docs>

### items

- 상품 리스트
- 상품 세부정보
- 상품 등록
- 상품 수정
- 상품 삭제

### options

- 옵션 리스트
- 옵션 세부정보
- 옵션 등록
- 옵션 수정
- 옵션 삭제

### payment

- 구매
- 반품

### paymethod

기존 결제 수단을 생성하고 다시 등록하는 방식으로 하여 수정을 제외하고 개발

- 결제수단 리스트
- 결제수단 등록
- 결제수단 삭제
