import {Link} from "react-router-dom"

function NotFound() {
    return (
        <div>
            <p>404 Сторінка не знайдена</p>
            <Link to="/">На головну</Link>
        </div>
    )
}

export default NotFound;