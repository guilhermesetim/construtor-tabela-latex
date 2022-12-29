function enviarParametroTabela(){
    var linhasUsr = Number(document.querySelector('#linhas').value);
    var colunasUsr = Number(document.querySelector('#colunas').value);

    titulo = "<label>Titulo da tabela</label><input type='text' id='captionTabela'><br>";
    label = "<label>Label da tabela</label><input type='text' id='labelTabela'>";
    tabela = criacaoTabela(linhasUsr, colunasUsr);
    campoEstilo = htmlEstiloTabela();
    

    document.querySelector('#respostaDados').innerHTML = (titulo+label+tabela+campoEstilo);
    document.querySelector('#bt-converter').innerHTML = `<input type='button' value='Converter Valores' onclick='codigo(${linhasUsr},${colunasUsr})'>`;

}

function limparCampos(){
    document.querySelector('#linhas').value = ''
    document.querySelector('#colunas').value = ''
}


function codigo(qLinhas, qColunas) {

    let escolha = document.querySelector('input[name="estilo"]:checked').value; 
    
  
    resultado = "<textarea rows='10' cols='40' maxlength='500'>";
    resultado += codigoLatex(qLinhas, qColunas, escolha);
    resultado+="</textarea>";

    document.querySelector('#table-latex').innerHTML = resultado;
  
}

function header(colunas, escolha) {

    let titulo = document.querySelector('#captionTabela').value;
    let label = document.querySelector('#labelTabela').value;

    formatoTabular = tabEstilo(colunas, escolha);

    _header =  "\\begin{table}[h]\n";
    _header += "\\centering\n";
    _header += `\\caption{${titulo}}\n`;
    _header += `\\label{tab:${label}}\n`;
    _header += `\\begin{tabular}{${formatoTabular}}\n`;
    _header += "\\hline\n";

    return _header;
}


function final() {

    _final = "\\hline\n";
    _final += "\\end{tabular} \n";
    _final += `\\centerline{Fonte: }\n`;
    _final += "\\end{table}\n";

    return _final;
}



function tabEstilo(colunas, _escolha) {
    
    _formatoTabular = "";
    _estilo = "";
    
    if(_escolha == "t") {
        _estilo = "c";
    }
    else if (_escolha == "q") {
        _estilo = "c|";
        _formatoTabular+="|";
    }


    col = 0;
    do {
        _formatoTabular+= _estilo;
        ++col;
    } while(col < colunas);

    return _formatoTabular;
}

function htmlEstiloTabela() {
    campo = "<fieldset>";
    campo+="<legend>Estilo da tabela:</legend>"
    campo += `<input type="radio" name="estilo" id="tab" value="t" checked>`;
    campo += `<label for="tab">&#9636 Tabela </label>`;
    campo += `<input type="radio" name="estilo" id="quad" value="q">`;
    campo += `<label for="quad">&#9638 Quadro </label>  <br>`;
    campo += `<input type="checkbox" name="propTab" id="cabecalhoTab" value="cabecalho">`;
    campo += `<label for="cabecalhoTab">Possui cabeçalho</label> <br>`;
    campo += `<input type="checkbox" name="propTab" id="primLinhaNeg" value="primLinha">`;
    campo += `<label for="primLinhaNeg">Primeira linha em negrito</label> <br>`;
    campo += `<input type="checkbox" name="propTab" id="primColunaNeg" value="primColuna">`;
    campo += `<label for="primColunaNeg">Primeira coluna em negrito</label>`;
    campo += `</fieldset>`;

    return campo;
}

function criacaoTabela(linhasUsr, colunasUsr) {
    tabela = "<table>";
    for(l = 0; l < linhasUsr; ++l) {
        tabela+= "<tr>";
            for(c = 0; c < colunasUsr; ++c) {
                tabela+=`<td> <input type='text' name='' id='v${l}${c}' size='10'> </td>`;
            }
        tabela+="</tr>";
    }
    tabela += "</table>"; 

    return tabela;
}

function codigoLatex(qLinhas, qColunas, escolha) {

    let cab = false;
    let pl = false;
    let pc = false;

    let propriedades = document.getElementsByName('propTab');

    for (var i = 0; i < propriedades.length; i++){
        if ( propriedades[i].checked ) {
            if(propriedades[i].value == "cabecalho"){
                cab = true;
            }else if (propriedades[i].value == "primLinha") {
                pl = true;
            }else if (propriedades[i].value == "primColuna") {
                pc = true;
            }
        }
    }

    resultado = "";
    resultado+= header(qColunas, escolha);
    for(l = 0; l < qLinhas; ++l) {
            for(c = 0; c < qColunas; ++c) {
                let valor = "";

                if(pl && l == 0){valor+="\\textbf{";}
                if(pc && c == 0){valor+="\\textbf{";}

                valor += document.querySelector(`#v${l}${c}`).value

                if(pl &&  l == 0) {valor+="}";}
                if(pc && c == 0){valor+="}";}

                if(c < qColunas-1) {resultado+= `${valor} & `; }
                else {resultado+= valor;}               
            }
        
        resultado+=" \\\\ ";

        if(l == 0 && cab && escolha == "t") {resultado+="\\hline";}
        if(escolha == "q" && l < qLinhas-1){resultado+="\\hline";}

        resultado+= "\n";
    }

    resultado+= final();

    return resultado;
}