// 사이드바 컴포넌트 -> 메뉴를 삽입
class Sidebar extends React.Component {
    
    render() {
        const { onSetCategory } = this.props;

        return (
            <div className="sidebar-container">
                <div className="sidebar-item-logo-box">
                    <a href="/"><img src="re/img/logo2.svg" id="logo"></img></a>
                </div>
                <Menu 
                    onSetCategory={onSetCategory}
                />
            </div>
        );
    }
}

//메뉴 컴포넌트
class Menu extends React.Component {
    render() {
        const { onSetCategory } = this.props;

        return (
            <div className="sidebar-items">
                <div className="sidebar-item-menu-box">
                    <h4>MENU</h4>
                </div>
                <MenuList 
                    onSetCategory={onSetCategory}
                />
            </div>

        );
    }
}

//메뉴의 자식 컴포넌트 -> 메뉴 목록 반환
class MenuList extends React.Component {
    render() {
        const { onSetCategory } = this.props;

        return (
            <div >
                <ul className="sidebar-item-menu-ul">
                    <li onClick={ () => onSetCategory("product", "제품") }>제품 관리</li>
                    <li onClick={ () => onSetCategory("sub", "구독") }>구독 관리</li>
                    <li onClick={ () => onSetCategory("orders", "주문") }>주문 관리</li>
                    <li onClick={ () => onSetCategory("member", "회원") }>회원 관리</li>
                    <li onClick={ () => onSetCategory("review", "리뷰") }>리뷰 관리</li>
                    <li onClick={ () => onSetCategory("tag", "태그") }>태그 관리</li>
                </ul>
            </div>
        );
    }
}