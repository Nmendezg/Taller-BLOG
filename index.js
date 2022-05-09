var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
var path = __dirname + "/src/views";
app.set("views", path);
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/views/estilos"));

mongoose.connect("mongodb+srv://nmendezg:nico635420@cluster0.7eyiv.mongodb.net/blog?retryWrites=true&w=majority")
    .then(function (db) {
        console.log("conectado!!");
    }).catch(function (err) {
        console.log("hay un error", err);
    })

var entrada = require("./src/models/entradas");
const entradas = require("./src/models/entradas");
const tareas = require("../Semana_10/2-05-2022/src/models/tareas");

//RUTAS!

app.get("/inicio", async function (req, res) {
    var docs = await entrada.find();
    console.log(docs);
    var tit = "Aqui esta el blog!"
    res.render("index", { titulo: tit, entradas: docs });

})

//Crear entrada

app.get("/crear",  function (req, res) {
    res.render("crear")
})

app.post("/entrada", async function(req,res){
    var datos=req.body;
    var nueva_entrada= new entrada(datos);
    await nueva_entrada.save();
    console.log("entrada guardada");
    res.redirect("/inicio");
})

//Ver entrada

app.get("/ver/:id_entrada", async function(req,res){
    var id= req.params.id_entrada;
    var entrada=  await entradas.findById(id);

    res.render("ver", {
        titulo:entrada.titulo,
        imagen:entrada.imagen,
        autor:entrada.autor,
        contenido:entrada.contenido
    });

})

app.get("/modificar/:id_entrada", async function(req,res){
    var id= req.params.id_entrada;
    var entrada= await entradas.findById(id);

    res.render("modificar",{
        id:entrada._id,
        titulo:entrada.titulo,
        autor:entrada.autor,
        contenido:entrada.contenido,
        imagen:entrada.imagen
    })
})

app.post("/modificar/:id_entrada", async function(req,res){
    var id= req.params.id_entrada;
    var entrada=await entradas.findById(id);
    

    entrada.titulo=req.body.titulo;
    entrada.autor=req.body.autor;
    entrada.contenido=req.body.contenido;
    entrada.imagen=req.body.imagen;
    await entrada.save();
    res.redirect("/inicio")
})

//Eliminar entrada

app.get("/eliminar/:id_entrada", async function(req,res){
    var id = req.params.id_entrada;
    var entrada=await entradas.findById(id);

    await entrada.remove();
    res.redirect("/inicio");
})



app.listen(4000);