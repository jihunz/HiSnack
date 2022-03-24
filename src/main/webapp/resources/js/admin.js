'use strict'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="container">
                <span>
                    <h4>제품 데이터 관리</h4>
                    <h4>제품을 쉽게 관리할 수 있도록 도움을 주는 페이지</h4>
                </span>
                <h2>제품</h2>
                <Sidebar/>
                <Section/>
            </div>
        );
    }
}

class Section extends React.Component {
    render() {
        return (
            <div>
                <Search/>
                {/* <Btns/>
                <DataTable/> */}
            </div>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text" name="keyword" placeHolder="제품 번호, 제품명, 제조사 등"/>
                    <button><img src=""/>검색</button>
                </form>
            </div>
        );
    }
}

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <div className="sbHeader">
                    <img src="../img/logo2.svg" id="logo"></img>
                </div>
                <Menu/>
            </div>
        );
    }
}

class Menu extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h4>MENU</h4>
                </div>
                <MenuList/>
            </div>

        );
    }
}

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

ReactDOM.render(<div><Dashboard/></div>, document.querySelector("#app"));