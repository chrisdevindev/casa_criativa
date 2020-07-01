const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){

    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    
    `)

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
        "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        "Curso de Programação",
        "Estudos",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nemo ea cupiditate explicabo",
        "https://rocketseat.com.br"
        
    ]

    ///////////////// -- INSERIR DADO NA TABELA -- /////////////////////////////////////////////////////

    // db.run(query, values, function(err){ //essa function vai ser chamada quando o dado for inserido

    //     if(err) return console.log(err)

    //     console.log(this)
    // }) 

    ///////////////// -- DELETAR DADO NA TABELA --  /////////////////////////////////////////////////////////
    
    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
        if(err)return console.log(err)
        console.log("DELETADO", this)
    })



    //////////////// -- CONSULTAR DADOS NA TABELA -- ////////////////////////////////////////////////////////

    db.all(`SELECT * FROM ideas`, function(err, rows){

        if(err) return console.log(err)
        console.log(rows)
    })

})