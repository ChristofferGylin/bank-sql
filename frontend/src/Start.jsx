import InfoArticle from "./InfoArticle";

const Start = () => {

    return (
        <div className="flex flex-col gap-16">
            <img src="./piggybank.jpg" alt="Piggybank" />
            <InfoArticle
                title='Welcome to Piggy Bank'
                tagline='You can trust us with your money. Just look at us. We have suits and ties!'
                img='./pigsuitandtie.jpg'
                imgAlt='Suit and tie guy'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem ex labore amet modi ipsam. Aliquid temporibus placeat odit! Adipisci repudiandae fugiat earum dolor quas?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eveniet omnis magnam commodi sapiente ea hic enim. Lorem ipsum dolor sit amet.</p>
            </InfoArticle>
            <InfoArticle
                title='Huff, puff and blow-proof facilities'
                tagline='With us your money is safe from wolves and other baddies.'
                img='./vault.jpg'
                imgAlt='Bank vault'
                reverse={true}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem ex labore amet modi ipsam. Aliquid temporibus placeat odit! Adipisci repudiandae fugiat earum dolor quas?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eveniet omnis magnam commodi sapiente ea hic enim. Lorem ipsum dolor sit amet.</p>
            </InfoArticle>
        </div>
    )

}

export default Start;