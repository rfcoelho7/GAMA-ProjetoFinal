class Curso {
    constructor (id, titulo, descricao, imagem, professor, aulas, dtAdd, dtUpdate){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.professor = professor;
        this.aulas = aulas;
        this.dtAdd = dtAdd;
        this.dtUpdate = dtUpdate;
    }
}
let lista_cursos = [];

//add
const addCursoForm = document.querySelector("[add-curso]");
const addId = document.querySelector("[new-id-curso]");
const addTitle = document.querySelector("[new-titulo-curso]");
const addDescricao = document.querySelector("[new-descricao-curso]");
const addImg = document.querySelector("[new-imagem-curso]");
const addProf = document.querySelector("[new-prof-curso]");
const addAulas = document.querySelector("[new-aulas-curso]");
const tabelaCursos = document.querySelector("[tabelaCursos]");

addCursoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let dthora = new Date().toISOString();
    let cursoAdd = new Curso(addId.value,addTitle.value,addDescricao.value,addImg.value,addProf.value,addAulas.value,dthora,dthora);
    if (validaNew(cursoAdd.id) < 0){
        if (validaCamposMinOK(cursoAdd)){
            lista_cursos.push(cursoAdd);
            renderAdded();
            alert("Curso adicionado com sucesso");
            addId.value = "";
            addTitle.value = "";
            addDescricao.value = "";
            addImg.value = "";
            addProf.value = "";
            addAulas.value = "";
        } else {
            alert("Preencha no mínimo ID e Título");
        }
    } else {
        alert("ID duplicado. Favor corrija.");
    }
})

function validaNew(newID){
    let lista_ids = [];
    lista_cursos.forEach(item => lista_ids.push(item.id));
    return lista_ids.indexOf(newID);
}

function validaCamposMinOK(cursoAdd){
    return cursoAdd.id != "" && cursoAdd.titulo !="";
}

function renderAdded(){
    const lin = document.createElement('tr');
    lin.innerHTML = `
                    <th>${lista_cursos[lista_cursos.length-1].id}</th>
                    <th>${lista_cursos[lista_cursos.length-1].titulo}</th>
                    <th>${lista_cursos[lista_cursos.length-1].descricao}</th>
                    <th><img src=${lista_cursos[lista_cursos.length-1].imagem}></th>
                    <th>${lista_cursos[lista_cursos.length-1].professor}</th>
                    <th>${lista_cursos[lista_cursos.length-1].aulas}</th>
                    <th>${lista_cursos[lista_cursos.length-1].dtAdd}</th>
                    <th>${lista_cursos[lista_cursos.length-1].dtUpdate}</th>
                    <th><button class="updateButton" onclick="updateButton('${lista_cursos[lista_cursos.length-1].dtAdd}')" id="btn_upd_${lista_cursos[lista_cursos.length-1].dtAdd}">Editar</button></th>
                    <th><button class="deleteButton" onclick="deleteButton('${lista_cursos[lista_cursos.length-1].dtAdd}')" id="btn_del_${lista_cursos[lista_cursos.length-1].dtAdd}">Remover</button></th>`;
    tabelaCursos.appendChild(lin);
}

//fullList
const viewFullList = document.querySelector("[fullList]");

viewFullList.addEventListener('click', function(e) {
    e.preventDefault();
    updateInfo.hidden = true;
    restartList();
    renderList(lista_cursos);
})

function renderList(listaCursoRender){
    listaCursoRender.forEach(function(curso) {
        const lin = document.createElement('tr');
        lin.innerHTML = `
                        <th>${curso.id}</th>
                        <th>${curso.titulo}</th>
                        <th>${curso.descricao}</th>
                        <th><img src=${curso.imagem}></th>
                        <th>${curso.professor}</th>
                        <th>${curso.aulas}</th>
                        <th>${curso.dtAdd}</th>
                        <th>${curso.dtUpdate}</th>
                        <th><button class="updateButton" onclick="updateButton('${curso.dtAdd}')" id="btn_upd_${curso.dtAdd}">Editar</button></th>
                        <th><button class="deleteButton" onclick="deleteButton('${curso.dtAdd}')" id="btn_del_${curso.dtAdd}">Remover</button></th>`;
            tabelaCursos.appendChild(lin);
    })
}

function restartList(){
    tabelaCursos.innerHTML = `<tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Imagem</th>
                <th>Professor</th>
                <th>Aulas</th>
                <th>Data/hora adicionado</th>
                <th>Data/hora atualização</th>
                <th>Atualizar curso</th>
                <th>Remover curso</th></tr>`;
}

//search
const searchCursoForm = document.querySelector("[search-curso]");
const searchId = document.querySelector("[search-id]");
const searchTitle = document.querySelector("[search-titulo]");
const searchDescricao = document.querySelector("[search-descricao]");
const searchImg = document.querySelector("[search-imagem]");
const searchProf = document.querySelector("[search-prof]");
const searchAulas = document.querySelector("[search-aulas]");

searchCursoForm.addEventListener('submit', function(e) {
    updateInfo.hidden = true;
    e.preventDefault();
    if (validaPesquisaOK(searchId.value, searchTitle.value,searchDescricao.value, searchImg.value, searchProf.value, searchAulas.value)){
        let listaCursoSearch = encontrarPosicoes(searchId.value, searchTitle.value,searchDescricao.value, searchImg.value, searchProf.value, searchAulas.value);
        if (listaCursoSearch == ""){
            alert("Nenhum curso corresponde aos critérios informados. Apresentando lista completa.");
            restartList();
            renderList(lista_cursos);
        } else {
            restartList();
            renderList(listaCursoSearch);
        }
        searchId.value = "";
        searchTitle.value = "";
        searchDescricao.value = "";
        searchImg.value = "";
        searchProf.value = "";
        searchAulas.value = "";
    } else {
        alert("Informe pelo menos um campo para pesquisa");
    }
})

function validaPesquisaOK(id,title,descricao,img,prof,aulas){
    return id != "" || title != "" || descricao != "" || img != "" || prof != "" || aulas != "";
}

function encontrarPosicoes(id,title,descricao,img,prof,aulas){
    let listaSearch = [];
    for (let i = 0; i < lista_cursos.length; i++){
        let curso = lista_cursos[i];
        if (
            curso.id == id && id != "" || 
            curso.titulo == title && title != "" || 
            curso.descricao == descricao && descricao != "" || 
            curso.imagem == img && img != "" || 
            curso.professor == prof && prof != "" || 
            curso.aulas == aulas && aulas != ""
        ){
            listaSearch.push(curso);
        }
    }
    return listaSearch;
}

//update
const updateInfo = document.querySelector("[updateInfo]");
const updateCursoForm = document.querySelector("[update-curso]");
const updateId = document.querySelector("[update-id]");
const updateTitle = document.querySelector("[update-titulo]");
const updateDescricao = document.querySelector("[update-descricao]");
const updateImg = document.querySelector("[update-imagem]");
const updateProf = document.querySelector("[update-prof]");
const updateAulas = document.querySelector("[update-aulas]");
const btnUpdate = document.querySelector("[btnUpdate]");

let updateIndex;
let upDtReg;
function updateButton(dtRegistro){
    if (updateInfo.hidden){
        updateIndex = lista_cursos.findIndex(curso => curso.dtAdd == dtRegistro);
        upDtReg = dtRegistro;
        restartList();
        renderList([lista_cursos[updateIndex]]);
        updateInfo.hidden = false;
    } else {
        upDtReg = "";
        restartList();
        renderList(lista_cursos);
        updateInfo.hidden = true;
    }
}

updateCursoForm.addEventListener('submit', function(e) {
    e.preventDefault();
            let upID = updateId.value == "" ? lista_cursos[updateIndex].id : updateId.value;
            let upTitle = updateTitle.value == "" ? lista_cursos[updateIndex].titulo : updateTitle.value;
            let upDesc = updateDescricao.value == "" ? lista_cursos[updateIndex].descricao : updateDescricao.value;
            let upImg = updateImg.value == "" ? lista_cursos[updateIndex].imagem : updateImg.value;
            let upProf = updateProf.value == "" ? lista_cursos[updateIndex].professor : updateProf.value;
            let upAulas = updateAulas.value == "" ? lista_cursos[updateIndex].aulas : updateAulas.value;
            if(validaUpdate(upID,upDtReg)){
                lista_cursos[updateIndex].id = upID;
                lista_cursos[updateIndex].titulo = upTitle;
                lista_cursos[updateIndex].descricao = upDesc;
                lista_cursos[updateIndex].imagem = upImg;
                lista_cursos[updateIndex].professor = upProf;
                lista_cursos[updateIndex].aulas = upAulas;
                lista_cursos[updateIndex].dtUpdate = new Date().toISOString();
                restartList();
                renderList(lista_cursos);
                updateInfo.hidden = true;
                alert("Curso atualizado");
                updateId.value = "";
                updateTitle.value = "";
                updateDescricao.value = "";
                updateImg.value = "";
                updateProf.value = "";
                updateAulas.value = "";
            } else {
                alert("ID duplicado, favor ajustar");
            }
})

function validaUpdate(id,excecaoDtRegistro){
        let lista_ids = [];
        lista_cursos.forEach(item => {if (item.dtAdd != excecaoDtRegistro){lista_ids.push(item.id)}});
        return lista_ids.indexOf(id)<0;
}

//delete
function deleteButton(dtRegistro){
    updateInfo.hidden = true;
    let removeIndex = lista_cursos.findIndex(curso => curso.dtAdd == dtRegistro);
    lista_cursos.splice(removeIndex,1);
    restartList();
    renderList(lista_cursos);
}