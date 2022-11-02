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
- 규격 테이블 



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
<img width="880" alt="ERD" src="https://user-images.githubusercontent.com/88824305/199491770-1b73edf6-a799-4c25-8a57-5a39ec1bd565.jpg">

</br>

- grade table: 사용자의 등급을 정해서 게시판 기능 이용에 차등을 주도록 설계했음
- board table: 기능 이용 등급 차등화를 위해서 게시판에도 등급을 부여했음(type table)
- user table: soft delete 와 hard delete 를 구분했음. deleted_at 칼럼을 작성함.
- user table: 소셜 로그인과 로컬 로그인 가능. name 이 겹칠 우려가 있어 platform_type table 작성함.

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
