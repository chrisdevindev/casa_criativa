const express = require('express')
const server = express()

const db = require('./db')


// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
//         title: "Curso de Programação",
//         category:"Estudos",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
//         url:"https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2833/2833866.svg",
//         title: "Exercícios",
//         category:"Saúde",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
//         url:"https://sus.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2833/2833157.svg",
//         title: "Home office",
//         category:"Trabalho",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
//         url:"https://trabalho.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2228/2228088.svg",
//         title: "Higiene Pessoal",
//         category:"Higiene",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
//         url:"https://dentistas.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2228/2228089.svg",
//         title: "Lanche",
//         category:"Nutrição",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
//         url:"https://nutri.com.br"
//     }
// ]


server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))


const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})


server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {

        if (err) {
            console.log(err)
            return res.send("Houve um erro com o banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (idea of reversedIdeas) {
            if (lastIdeas.length < 3) {
                lastIdeas.push(idea)

            }
            console.log(idea)
        }

        return res.render("index.html", {
            ideas: lastIdeas
        })
    })



})

server.get("/ideias", function (req, res) {


    db.all(`SELECT * FROM ideas`, function (err, rows) {

        if (err) {
            console.log(err)
            return res.send("Houve um erro com o banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {
            ideas: reversedIdeas
        })

    })
})

server.post("/", function (req, res) {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) 
    
    VALUES(?,?,?,?,?); `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    /////////////// -- INSERIR DADO NA TABELA -- /////////////////////////////////////////////////////

    db.run(query, values, function (err) { //essa function vai ser chamada quando o dado for inserido

        if (err) {
            console.log(err)
            return res.send("Houve um erro com o banco de dados!")
        }

        return res.redirect("/ideias")
    })
})

server.listen(3000)
