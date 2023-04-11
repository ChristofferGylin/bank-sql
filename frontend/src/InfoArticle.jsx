const InfoArticle = ({ title, tagline, img, imgAlt, reverse, children }) => {
    const style = 'grid grid-cols-2 items-start gap-8 mx-12 pb-12 border-b border-pink-300';

    if (reverse) {

        return (
            <div className={style}>
                <img className="w-full rounded" src={img} alt={imgAlt} />
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl text-pink-950 font-bold">{title}</h2>
                    <p className="font-semibold text-pink-950">{tagline}</p>
                    {children}
                </div>
            </div>
        )

    } else {

        return (
            <div className={style}>
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl text-pink-950 font-bold">{title}</h2>
                    <p className="font-semibold text-pink-950">{tagline}</p>
                    {children}
                </div>
                <img className="w-full rounded" src={img} alt={imgAlt} />
            </div>
        )
    }

}

export default InfoArticle;