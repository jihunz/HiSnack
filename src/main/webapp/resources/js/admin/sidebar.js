// 사이드바 컴포넌트 -> 메뉴를 삽입
class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <div className="sbHeader">
                    <a href="../../"><img src="re/img/logo2.svg" id="logo"></img></a>
                </div>
                <Menu />
            </div>
        );
    }
}

//메뉴 컴포넌트
class Menu extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h4>MENU</h4>
                </div>
                <MenuList />
            </div>

        );
    }
}

//메뉴의 자식 컴포넌트 -> 메뉴 목록 반환
class MenuList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><a href="">제품 관리</a></li>
                    <li><a href="">구독 관리</a></li>
                    <li><a href="">주문 관리</a></li>
                    <li><a href="">회원 관리</a></li>
                    <li><a href="">리뷰 관리</a></li>
                    <li><a href="">태그 관리</a></li>
                </ul>
            </div>
        );
    }
}