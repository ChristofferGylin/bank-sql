const getCookie = (cookieName) => {

    if (!document.cookie) return;

    console.log(document.cookie);

    const cookies = document.cookie.split(' ');
    const cookie = cookies.find(cookie => cookie.includes(cookieName)).split('=')[1].replace(';', '');

    return cookie

}

export default getCookie;