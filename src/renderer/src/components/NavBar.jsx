function NavBar (){
    return(
        <nav className="navbar">
            <div className="logo_item">
                <h4>Numerical methods</h4>
            </div>

            <div className="search_bar">
                <input type="text" placeholder="Search" />
            </div>

            <div className="navbar_content">
                <i className='bx bx-sun' id="darkLight"></i>
                <i className='bx bx-bell'></i>
            </div>
        </nav>
    )
}

export default NavBar;