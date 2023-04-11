import { Link } from "react-router-dom"

const Button = ({ title, link, callback }) => {

    const button = <button className="border border-pink-700 text-md font-normal rounded-lg py-1 px-2 w-full bg-pink-600 hover:bg-pink-700 text-pink-50" onClick={callback}>{title}</button>;

    if (link) {

        return <Link className="w-full" to={link}>{button}</Link>;

    } else {

        return button;

    }
}

export default Button;