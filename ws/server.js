const express = require('express')
const server  = express()


const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title: "Curso de Programação",
        category:"Estudos",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2833/2833866.svg",
        title: "Exercícios",
        category:"Saúde",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
        url:"https://sus.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2833/2833157.svg",
        title: "Home office",
        category:"Trabalho",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
        url:"https://trabalho.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2228/2228088.svg",
        title: "Higiene Pessoal",
        category:"Higiene",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
        url:"https://dentistas.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2228/2228089.svg",
        title: "Lanche",
        category:"Nutrição",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
        url:"https://nutri.com.br"
    }
]


server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,    
    noCache: true
})


server.get("/", function(req, res){ 

    const reversedIdeas = [...ideas].reverse()
    let lastIdeas = []
    for (idea of ideas){
        if(lastIdeas.length < 3){
            lastIdeas.push(idea)

        }
        console.log(idea)
    }


    return res.render("index.html", {
        ideas: lastIdeas
    })

})

server.get("/ideias", function(req, res){

    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html",{
        ideas: reversedIdeas
    }) 
    
})

server.listen(3000)
