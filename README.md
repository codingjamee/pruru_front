<img src="https://capsule-render.vercel.app/api?type=Rounded&color=42f548&height=100&text=당신의%20냉장고를%20신선하게%20PRURU&fontColor=ffffff&section=header&fontSize=30" /><img src="https://github.com/codingjamee/pruru_front/assets/99540667/0b44b766-3da2-4497-88fd-2fe626e683f9" width="100px" height="100px"/>

### 1. 설치 및 실행방법

```
$ git clone https://github.com/codingjamee/my-refrigerator-back.git
$ git clone https://github.com/codingjamee/pruru_front.git
$ cd my-refrigerator-back
$ sudo docker-compose up --build

http://localhost/ 실행
```

test 계정 :

- [1]

```
id: test@test.com
pw: hellotest1
```

- [2]

```
id: test2@test.com
pw: hellotest1
```

### 2. 배포링크

<a href="http://ec2-13-209-135-79.ap-northeast-2.compute.amazonaws.com/" target="_blank">배포 링크</a> <br>
<a href="https://dbdiagram.io/d/65c6e16dac844320aed83b44" target="_blank">db</a><br>
<a href="https://www.figma.com/file/xcU6l7pfXA6HFCjJWfpAYD/refrigerator?type=design&node-id=0-1&mode=design&t=B84jVdtzD1Flbpej-0" target="_blank">figma</a><br>

### 3. 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>   
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>

### 4. 프로젝트의 주요 특징

- 개인 프로젝트
- 검색 엔진 최적화 (SEO)  
  - **Next.js의 서버 사이드 렌더링 (SSR)** 을 활용하여 애플리케이션의 검색 엔진 순위를 향상시켰습니다.
- 유연한 요청 처리
- **Next.js의 미들웨어**
  - 자체적인 로그인 API 로직을 구현하기로 결정했습니다.  
    프로젝트에서 Next Auth의 기본 제공 필드 및 로직이 요구 사항을 완벽히 충족시키지 못한다고 판단했기 때문입니다.  
  - 이 과정에서 Next.js의 미들웨어 기능을 도입하여 사용자 인증 과정을 강화하고, 세밀한 제어를 가능하게 했습니다.
- 효율적인 폼 관리
  - **React-hook-form** 사용으로 폼이 많은 것이 특징인 프로젝트에서 과도한 리렌더링을 방지하고,  
    유효성 검사 로직 등의 다양한 스테이트를 효율적으로 관리하였습니다.
- Stateless 설계
  - **React Query의 캐싱 기능**을 활용하여  
    상태를 저장하지 않는 방식으로 애플리케이션의 복잡성을 줄이고 성능을 향상시켰습니다.
- 커스텀한 fetch 함수
  - **Next.js의 Fetch 기능** 활용하여  
    불필요한 중복 API 호출을 방지하고자 Next.js의 Fetch 기능을 활용합니다.  
    이는 서버사이드 렌더링 환경에서 특히 유용하며, API 요청의 효율성을 높여줍니다.  
  - **Axios Interceptor 및 Custom Instance 모방**   
    Axios 라이브러리의 인터셉터 기능과 커스텀 인스턴스 기능을 모방하여,  
    API 응답을 사전에 가공하거나 조정할 수 있습니다.  
    이를 통해 요청 전후의 처리를 가공하여 사용자 경험을 개선시키고자
    커스텀 토스트를 활용하였습니다. 
- 무한 스크롤 구현
  - **React Query의 infiniteQuery** 기능을 통해  
    사용자 경험을 향상시키는 무한 스크롤 기능을 쉽게 구현했습니다.
- 디자인 시스템 맞춤 구현  
  **Compound Component 방식**으로 Carousel을 직접 개발하여 맞춤형 구현을 제공합니다.
- 모의 API 테스트
  - **MSW를 활용**하여 프론트엔드 개발기간을 단축시키고자  
    백엔드 API 개발이 완료되기 전에 모의 서버를 통해 프론트엔드 개발을 지속 하였습니다.
- 일관된 개발 환경 제공
  - **Docker를 사용**하여 로컬과 배포 환경의 일관성을 유지하며,  
    여러 환경에서의 개발 및 배포가 용이해졌습니다.
- 개발 비용 축소
  - **Docker의 mysql이미지**를 생성하여 volume과 연결하는 방식으로 개발 비용을 축소하였습니다.
- 사용자 편의성 제공
  - 다양한 식자재를 등록하는데 편의성을 더하고자
    영수증을 전송하면 AI분석기능인 Naver CLOVA API 및 Naver Search API로
    식자재 명과 금액 카테고리등을 자동으로 제공합니다.
  - **tailwind prefix 활용**하여 UX개선을 위해 멀티 디바이스에 대응하여 반응형 UI로 설계하였습니다.
  - **next prefers-color-scheme**를 활용하여 사용자 선호 테마로 다크모드 라이트모드 UI 구현하였습니다.

### 5. 프로젝트의 소개

- 냉장고에서 버려지는 식재료가 너무 많았습니다.
- 장보러 나갔을 때 냉장고에 무엇이 들어있는지 몰라 사오니 이미 그 식자재를 두번 샀던 경험이 있습니다.
- 이러한 불편함을 풀어보고자 직접 사용 목적으로 프로젝트를 만들었습니다.

### 6. 프로젝트 기능 소개

- 회원가입 /로그인

  <img width="400" alt="회원가입/로그인페이지" src="https://github.com/codingjamee/pruru_front/assets/99540667/7f1b1a34-b629-41ad-9564-4a613081440d">  
  <img width="370" alt="안내문구" src="https://github.com/codingjamee/pruru_front/assets/99540667/75b3579f-8d1a-4b24-8305-4f17ec06f3d9">

- 유통기한 임박, 최근 산 재료 보여주기  
- <img width="400" alt="home페이지" src="https://github.com/codingjamee/pruru_front/assets/99540667/7f51fd7d-7416-4417-b3bb-da8be05a7cb7">

- 식재료 관리 (보관방법, 금액순, 유통기한 순 보여주기)  
  <img width="400" alt="식재료보기" src="https://github.com/codingjamee/pruru_front/assets/99540667/ef09a8ef-e760-40d9-a0eb-98b55cf41fd97">

- 식재료 추가시 Naver 검색 api 활용하여 카테고리, 시중상품 명, 이미지 자동입력 기능  
  <img width="400" alt="식재료검색모달" src="https://github.com/codingjamee/pruru_front/assets/99540667/263ab16c-c977-489e-8f58-3a1a981eaeee">

- 영수증 관리 (월별보기)  
   <img width="400" alt="영수증관리" src="https://github.com/codingjamee/pruru_front/assets/99540667/07ab7502-eb5e-4e05-a23e-7adca7ee2bab">  

- 영수증 추가시 사진 업로드하여 자동 분석기능 (수동입력 기능 포함)  
  <img width="400" alt="영수증자동분석" src="https://github.com/codingjamee/pruru_front/assets/99540667/d9373edc-2040-4489-8158-83afc12e08f2">

- 영수증에서 식재료 추가 버튼 클릭시 금액, 구매일자 등 다수 필드 자동 입력기능  
  <img width="400" alt="Screenshot 2024-04-16 at 8 14 14 PM" src="https://github.com/codingjamee/pruru_front/assets/99540667/35b4eebb-fdc7-4b06-877a-06ce636679eb">  
