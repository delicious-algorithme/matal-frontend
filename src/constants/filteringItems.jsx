export const FITERING_INFO = [
    {
        id: 1,
        name: '메뉴',
        filter_type: 'category',
        contents: [
            '한정식',
            '일식당',
            '양식',
            '중식당',
            '카페,디저트',
            '베이커리',
            '칼국수,만두',
            '냉면',
            '기사식당',
            '한식',
            '백반,가정식',
            '생선구이',
            '육류,고기요리',
            '두부요리',
            '국밥',
            '주꾸미요리',
            '정육식당',
            '보리밥',
            '요리주점',
            '찌개,전골',
            '닭갈비',
            '맥주,호프',
            '인도음식',
            '카레',
            '초밥,롤',
            '돈가스',
            '떡볶이',
            '종합분식',
            '조개요리',
            '일본식라면',
            '덮밥',
            '베트남음식',
            '양꼬치',
            '생선회',
            '순대,순댓국',
            '샤브샤브',
            '이탈리아음식',
            '스파게티,파스타전문',
            '이자카야',
            '돼지고기구이',
            '태국음식',
            '아시아음식',
        ],
        value: [
            '한정식',
            '일식당',
            '양식',
            '중식당',
            '카페,디저트',
            '베이커리',
            '칼국수,만두',
            '냉면',
            '기사식당',
            '한식',
            '백반,가정식',
            '생선구이',
            '육류,고기요리',
            '두부요리',
            '국밥',
            '주꾸미요리',
            '정육식당',
            '보리밥',
            '요리주점',
            '찌개,전골',
            '닭갈비',
            '맥주,호프',
            '인도음식',
            '카레',
            '초밥,롤',
            '돈가스',
            '떡볶이',
            '종합분식',
            '조개요리',
            '일본식라면',
            '덮밥',
            '베트남음식',
            '양꼬치',
            '생선회',
            '순대,순댓국',
            '샤브샤브',
            '이탈리아음식',
            '스파게티,파스타전문',
            '이자카야',
            '돼지고기구이',
            '태국음식',
            '아시아음식',
        ],
    },
    {
        id: 2,
        name: '지역',
        filter_type: 'addresses',
        contents: {
            city: ['서울', '경기'],
            seoul: [
                '서울 전체',
                '강남구',
                '강동구',
                '강북구',
                '강서구',
                '관악구',
                '광진구',
                '구로구',
                '금천구',
                '노원구',
                '동대문구',
                '동작구',
                '마포구',
                '서대문구',
                '서초구',
                '성동구',
                '성북구',
                '송파구',
                '양천구',
                '영등포구',
                '용산구',
                '은평구',
                '종로구',
                '중구',
                '중랑구',
            ],
            gyeongi: [
                '경기 전체',
                '가평',
                '고양',
                '과천',
                '광명',
                '광주',
                '구리',
                '군포',
                '김포',
                '남양주',
                '동두천',
                '부천',
                '성남',
                '시흥',
                '안산',
                '안성',
                '안양',
                '여주',
                '이천',
                '용인',
                '의정부',
                '오산',
                '양주',
                '연천',
                '인천',
                '하남',
                '평택',
                '포천',
            ],
        },
    },
    {
        id: 3,
        name: '긍정 비율',
        filter_type: 'positiveRatio',
        contents: [
            '긍정 비율 95%이상',
            '긍정 비율 90%이상',
            '긍정 비율 80%이상',
            '긍정 비율 70%이상',
            '긍정 비율 전체',
        ],
        value: [95, 90, 80, 70],
    },
    {
        id: 4,
        name: '리뷰 개수',
        filter_type: 'reviewsCount',
        contents: ['리뷰 999개 이상', '리뷰 500개 이상', '리뷰 100개 이상', '리뷰 전체'],
        value: [999, 500, 100],
    },
    {
        id: 5,
        name: '리뷰 평점',
        filter_type: 'rating',
        contents: ['평점 4.5이상', '평점 4이상', '평점 3.5이상', '평점 3이상', '평점 전체'],
        value: [4.5, 4, 3.5, 3],
    },
    {
        id: 6,
        name: '키워드',
        filter_type: 'positiveKeyword',
        contents: [
            '푸짐한 양',
            '친절한 서비스',
            '신선한 재료',
            '가성비 좋음',
            '깔끔한 인테리어',
            '다양한 메뉴',
            '넓은 공간',
        ],
        value: [
            '푸짐한 양',
            '친절한 서비스',
            '신선한 재료',
            '가성비 좋음',
            '깔끔한 인테리어',
            '다양한 메뉴',
            '넓은 공간',
        ],
    },
    {
        id: 7,
        name: '혼밥',
        filter_type: 'isSoloDining',
        contents: ['혼밥 가능', '혼밥 불가능'],
        value: [true, false, null],
    },
    {
        id: 8,
        name: '주차',
        filter_type: 'isParking',
        contents: ['주차 가능', '주차 불가능'],
        value: [true, false],
    },
    {
        id: 9,
        name: '웨이팅',
        filter_type: 'isWaiting',
        contents: ['웨이팅 있음', '웨이팅 없음'],
        value: [true, false],
    },
    {
        id: 10,
        name: '애견 동반',
        filter_type: 'isPetFriendly',
        contents: ['애견 동반 가능', '애견 동반 불가능'],
        value: [true, false],
    },
];