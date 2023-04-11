import { Link } from "react-router-dom"

const BigButton = ({ title, link, callback }) => {

    const button = <button className="border border-pink-300 text-xl font-semibold rounded-lg py-2 px-4 w-full bg-pink-200 hover:bg-pink-300 text-pink-700 hover:text-pink-800" onClick={callback}>{title}</button>;

    if (link) {

        return <Link className="w-full" to={link}>{button}</Link>;

    } else {

        return button;

    }
}

export default BigButton;