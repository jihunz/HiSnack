class ProductTh extends React.Component {
    render() {
        return (
            <>
                <td>제품 번호</td>
                <td>사진</td>
                <td>제품명</td>
                <td>가격</td>
                <td>제조사</td>
                <td>관리</td>
            </>
        );
    }
}

class OrdersTh extends React.Component {
    render() {
        return (
            <>
                <td>주문 번호</td>
                <td>아이디</td>
                <td>전화번호</td>
                <td>주문 날짜</td>
                <td>총 가격</td>
                <td>관리</td>
            </>
        );
    }
}

class MemberTh extends React.Component {
    render() {
        return (
            <>
                <td>아이디</td>
                <td>이름</td>
                <td>전화번호</td>
                <td>관리 레벨</td>
                <td>관리</td>
            </>
        );
    }
}

class ReviewTh extends React.Component {
    render() {
        return (
            <>
                <td>리뷰 번호</td>
                <td>아이디</td>
                <td>작성 날짜</td>
                <td>별점</td>
                <td>관리</td>
            </>
        );
    }
}

class TagTh extends React.Component {
    render() {
        return (
            <>
                <td>태그 번호</td>
                <td>태그 내용</td>
                <td>관리</td>
            </>
        );
    }
}