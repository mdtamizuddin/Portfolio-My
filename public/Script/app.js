const portfolioContainer = document.getElementById('portfolio-container')
const portfolioContainerHome = document.getElementById('portfolio-container-home')

const getData = async () => {
    await fetch('https://mdtamiz.xyz/api/portfolio')
        .then(res => res.json())
        .then(json => setPortfolios(json))
}
getData()

const setPortfolios = (data) => {
    data.map(port => {
        return   portfolioContainer.innerHTML += `
        <div class="box-portflio hover-img">
        <div class="image img-style">
            <img class="img-item" src="${port.image}" alt="">
        </div>
        <div class="post">
            <a href="#">
                <h4>${port.name}</h4>
            </a >
            <p>${port.desc}</p>
            <div class="sc-btn-button">
                <a href="${port.sitelink}" target="_blank"
                    class="sc-button btn-2"><span>Visit Site
                    </span></a>
            </div>
        </div >
        </div >
    `
    })
}