<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->





<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#환경셋팅">환경셋팅</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# [프리온보딩] IMLAB 서버 개발 프로젝트

## About The Project

### 프로젝트 개요

#### 서비스 개요
    - 종류별 쿠폰 발급 기능과 쿠폰 사용 기능이 있는 결제 서비스(실시간 환율 계산, 나라별 차등 배송비, 내역 조회)


- 개발 조건
    - database 는 RDB 사용
    - 실시간 환율은 가산점
    - 규격에 맞게 개발
    - 요구 사항에 맞게 테스트 코드 작성시 가산점
    - 쿠폰 시스템에 맞게 데이터베이스 작성
    - 주어진 데이터 쓸것
- 책임

| 김성식 | 김혜린 | 문정진 | 이석원 |
| --- | --- | --- | --- |
| 구매 내역 추가 구현 | 주문내역 / 배송상태 | 쿠폰 신설 / 쿠폰 발급 / 쿠폰 사용 내역 열람 | 환율 / 배송비 |
| 데이터베이스 작성 |  |  | 초기 환경 셋팅 / ERD 작성 |


- 개발 우선순위
    1. 완성: 일정 준수 / API 정상 작동 / 코딩 컨벤션 / 코드패키지 구조
        1. 2022.11.2.수요일 23:59 까지 API 완성
        2. API 정상 작동 테스트: 수요일 17:00-24:00 까지
        3. 수요일 내로 README 작성
    2. 완성도: 비즈니스 로직 / 확장과 성능을 고려한 개발 
        1. 테스트 케이스 작성 및 구현
    3. 추가 구현: 자세한 내용은 아래에 있음
        1. 수요일 이후에 구현 
- 추가 구현 목표
    - 배포: docker / AWS 

### ERD
<img width="880" alt="ERD" src="https://user-images.githubusercontent.com/88824305/199638458-b6491fae-fc4c-45df-a889-63f13b8551a6.jpg">

</br>

- deliveryCost 는 Redis 서버를 사용함
- deliveryCost 는 csv 문서로 업데이트 한다고 가정함.
- deliveryCost 는 항목이 자주 업데이트 된다고 가정함. 그래서 파일을 읽고 가공하여 redis 로 업데이트 하도록 구현함.

### Built With

- Javascript
- Sequelize
- Node Js
- Postman
- Slack
- Discord
- Jest
- Supertest
- Redis



<!-- GETTING STARTED -->
## Getting Started
```
.
├── DeliveryCost.csv
├── app.js
├── package-lock.json
├── package.json
├── server.js
└── src
    ├── controllers
    │   ├── couponController.js
    │   ├── orderController.js
    │   └── purchaseController.js
    ├── middlewares
    │   ├── errorConstructor.js
    │   ├── errorHandler.js
    │   ├── exchangeRate.js
    │   ├── extendError.js
    │   ├── parsing.js
    │   └── redis.js
    ├── models
    │   ├── country.js
    │   ├── coupon.js
    │   ├── couponMeta.js
    │   ├── deliveryState.js
    │   ├── index.js
    │   ├── order.js
    │   ├── orderState.js
    │   └── user.js
    ├── routes
    │   ├── couponRouter.js
    │   ├── index.js
    │   ├── orderRouter.js
    │   └── purchaseRouter.js
    ├── services
    │   ├── couponService.js
    │   ├── orderService.js
    │   └── purchaseService.js
    ├── tests
    │   ├── deliveryCost.test.js
    │   ├── exchangeRate.test.js
    │   └── redis.test.js
    └── utils
        └── orderValidator.js
```

### 환경셋팅

- 프로젝트 셋업(Git repository & Server 초기세팅)
    - server 셋팅
        - sequelize 를 사용함
        - routes-controllers-services: 시퀄라이즈를 사용해 service layer 에서 DB 사용.
                
    - Git repo
        - 짧은 프로젝트 기간을 고려해 git flow 는 단순화했음: main-feature branch
        - 동료 리뷰는 Discord, Slack 으로 했음. Github pr 은 병목이 생길 우려가 있어서 리뷰를 하지 않기로 했음.
        - git 컨벤션: [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)



<!-- USAGE EXAMPLES -->
## Usage

[API 명세]

| METHOD | URL | 사용예시 | request | response |
| --- | --- | --- | --- | --- |
| POST | /purchase/:userId | /purchase/1 | {</br>"price": 100,</br>"quantity": 2,</br>"countryId": 221,</br>"couponId": 2</br>} | {</br>message: "Purchase success"</br>} |
| POST | /coupon | /coupon | {</br>"couponName" : "가을 배송비 쿠폰",</br>"couponTarget" : "배송비"</br>} | {</br>message: "message": "created coupon"</br>} |
| POST | /coupon/:couponId/user/:userId | /coupon/5/user/1 | {</br>"expiredDate" : "2022-11-15"</br>} | {</br>message: "message": "gave coupon"</br>} |
| GET | /coupon/:couponId/statistics | /coupon/5/statistics | // | {</br>"couponStatistics": {</br>"issuedCount": 2,</br>"usedCount": 8, </br>"totalDiscount": "80000.0"</br>}</br>}|

</br>
[테스트케이스 테이블]

| ID | 분류 | 테스트 항목 | 결과 | 비고 |
| --- | --- | --- | --- | --- |
| 1 | redis | redis 서버에 값을 넣음 | p |  |
| 2 | redis | redis 서버에서 값을 가져옴 | p |  |
| 3 | redis | redis 특정 키 값의 존재 여부  확인 | p |  |
| 4 | redis | redis 특정 키 값의 삭제 | p |  |
| 5 | 환율 | 외부 API 에서 값을 가져옴 | p |  |
| 6 | 환율 | 외부 API 에서 JPY 값을 가져옴 | p |  |
| 7 | 환율 | 달러 환율 값을 반환할 수 있음 | p |  |
| 8 | 환율 | KRW 환율 값을 반환할 수 있음 | p |  |
| 9 | 환율 | 오늘의 날짜 계산을 할 수 있음 yyyymmdd | p |  |
| 11 | 배송비 | 배송비 데이터를 json 형태로 처리. | p |  |
| 12 | 통합 | 배송비 데이터를 redis 서버에 입력. | p |  |
| 13 | 통합 | 배송비 데이터를 반환할 수 있다. | p |  |
| 14 | 통합 | 환율 정보를 redis 서버에서 가져올 수 있다. | p |  |
| 15 | 통합 | 환율 정보를 redis 서버에 입력할 수 있다. | p |  |

<!-- ROADMAP -->
## Roadmap

#### 구현 목표 

- [x] 배송상태 업데이트
- [x] 주문내역(검색/필터)
- [x] 쿠폰 신설
- [x] 쿠폰 발급
- [x] 쿠폰 사용 내역 열람(통계)
- [x] 구매 내역 추가
- [x] 환율 / 배송비
    - [ ] docker
    - [ ] AWS
