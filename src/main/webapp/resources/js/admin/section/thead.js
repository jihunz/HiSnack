class ProductTh extends React.Component {
    render() {
        return (
            <>
                <td className="thead-p-c1">제품 번호</td>
                <td className="thead-p-c2">사진</td>
                <td className="thead-p-c3">제품명</td>
                <td className="thead-p-c4">가격</td>
                <td className="thead-p-c5">제조사</td>
                <td className="thead-p-c6">관리</td>
            </>
        );
    }
}

class OrdersTh extends React.Component {
    render() {
        return (
            <>
                <td className="thead-o-c1">주문 번호</td>
                <td>아이디</td>
                <td>전화번호</td>
                <td>주문 날짜</td>
                <td>총 가격</td>
            </>
        );
    }
}

class MemberTh extends React.Component {
    render() {
        return (
            <>
                <td className="thead-m-c1">아이디</td>
                <td className="thead-m-c2">이름</td>
                <td className="thead-m-c3">전화번호</td>
                <td className="thead-m-c4">관리 레벨</td>
                <td className="thead-m-c5">관리</td>
            </>
        );
    }
}

class ReviewTh extends React.Component {
    render() {
        return (
            <>
                <td className="thead-r-c1">리뷰 번호</td>
                <td className="thead-r-c2">아이디</td>
                <td className="thead-r-c3">작성 날짜</td>
                <td className="thead-r-c4">별점</td>
                <td className="thead-r-c5">관리</td>
            </>
        );
    }
}

class TagTh extends React.Component {
    render() {
        return (
            <>
                <td className="thead-t-c1">태그 번호</td>
                <td className="thead-t-c2">태그 내용</td>
                <td className="thead-t-c3">관리</td>
            </>
        );
    }
}