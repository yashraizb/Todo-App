type NavbarProps = {
    toggle: () => void;
};

export default function Navbar({toggle}: NavbarProps) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="btn btn-light" type="button" onClick={toggle}><i className="bi bi-list"></i></button>
                <a className="navbar-brand me-auto ms-2" href="#">Task Manager</a>
            </div>
        </nav>
    )
};