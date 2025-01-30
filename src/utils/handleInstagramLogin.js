
const width = 600;
const height = 700;


const handleInstagramLogin = () => {
    
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const popupStr = `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`;
    console.log(instagramUrl)
    window.location.href=instagramUrl

};



export {handleInstagramLogin};