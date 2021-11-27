class Curso {
    constructor (id, titulo, descricao, imagem, professor, aulas){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.professor = professor;
        this.aulas = aulas;
    }
    getId(){
        return this.id
    }
}
let lista_cursos = []

//addCurso
const addCursoForm = document.querySelector("[add-curso]")
const addId = document.querySelector("[new-id-curso]")
const addTitle = document.querySelector("[new-titulo-curso]")
const addDescricao = document.querySelector("[new-descricao-curso]")
const addImg = document.querySelector("[new-imagem-curso]")
const addProf = document.querySelector("[new-prof-curso]")
const addAulas = document.querySelector("[new-aulas-curso]")

addCursoForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let cursoAdd = new Curso(addId.value,addTitle.value,addTitle.value,addDescricao.value,addImg.value,addProf.value,addAulas.value)
    cursoAdd
    if (validaNew(cursoAdd.id) < 0){
        alert("Curso adicionado com sucesso")
        lista_cursos.push(cursoAdd)
    } else {
        alert("ID duplicado. Favor corrija.")
    }
})

function validaNew(newID){
    let lista_ids = []
    lista_cursos.forEach(item => lista_ids.push(item.id))
    return lista_ids.indexOf(newID)
}

console.log(lista_cursos)


import * as data from './../db/courses.json';
const word = data;
console.log(word); // output 'testing'