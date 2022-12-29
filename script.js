function enviarParametroTabela(){
    var linhasUsr = Number(document.querySelector('#linhas').value);
    var colunasUsr = Number(document.querySelector('#colunas').value);

    titulo = "<label>Titulo da tabela</label><input type='text' id='captionTabela'>";

    tabela = "<table>";
    for(l = 0; l < linhasUsr; ++l) {
        tabela+= "<tr>";
            for(c = 0; c < colunasUsr; ++c) {
                tabela+=`<td> <input type='text' name='' id='v${l}${c}' size='10'> </td>`;
            }
        tabela+="</tr>";
    }
    tabela += "</table>"; 


    campo = "<fieldset>";
    campo+="<legend>Estilo da tabela:</legend>"
    campo += `<input type="radio" name="estilo" id="tab" value="t" checked>`;
    campo += `<label for="tab">Tabela</label>`;
    campo += `<input type="radio" name="estilo" id="quad" value="q">`;
    campo += `<label for="quad">Quadro</label>  <br>`;
    campo += `<input type="checkbox" name="propTab" id="cabecalhoTab" value="cabecalho">`;
    campo += `<label for="cabecalhoTab">Possui cabeçalho</label> <br>`;
    campo += `<input type="checkbox" name="propTab" id="primLinhaNeg" value="primLinha">`;
    campo += `<label for="primLinhaNeg">Primeira linha em negrito</label> <br>`;
    campo += `<input type="checkbox" name="propTab" id="primColunaNeg" value="primColuna">`;
    campo += `<label for="primColunaNeg">Primeira coluna em negrito</label>`;
    campo += `</fieldset>`;



    

    document.querySelector('#respostaDados').innerHTML = (titulo+tabela+campo);

    document.querySelector('#bt-converter').innerHTML = `<input type='button' value='Converter Valores' onclick='codigo(${linhasUsr},${colunasUsr})'>`;


    
}

function limparCampos(){
    document.querySelector('#linhas').value = ''
    document.querySelector('#colunas').value = ''
}


function codigo(qLinhas, qColunas) {

    let cab = false;
    let pl = false;
    let pc = false;

    let _escolha = document.querySelector('input[name="estilo"]:checked').value;
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
    
  
    resultado = "<textarea rows='10' cols='40' maxlength='500'>";

    resultado+= header(qColunas, _escolha);
    for(l = 0; l < qLinhas; ++l) {
            for(c = 0; c < qColunas; ++c) {
                let valor = "";
                if(pl && l == 0){
                    valor+="\\textbf{";
                }

                valor += document.querySelector(`#v${l}${c}`).value

                if(pl &&  l == 0) {
                    valor+="}";
                }

                if(c < qColunas-1) {
                    resultado+= `${valor} & `;
                }
                else {
                    resultado+= valor;
                }
                
            }
        

        resultado+=" \\\\ ";
        if(l == 0 && cab) {
            resultado+="\\hline";
        }
        if(_escolha == "q" && l < qLinhas-1)
        {resultado+="\\hline"};
        resultado+= "\n";
    }

    resultado+= final();

    resultado+="</textarea>";


    document.querySelector('#table-latex').innerHTML = resultado;
  
}

function header(colunas, escolha) {

    let titulo = document.querySelector('#captionTabela').value;

    formatoTabular = tabEstilo(colunas, escolha);

    _header =  "\\begin{table}[h]\n";
    _header += "\\centering\n";
    _header += `\\caption{${titulo}}\n`;
    _header += `\\begin{tabular}{${formatoTabular}}\n`;
    _header += "\\hline\n";

    return _header;
}

function final() {
    _final = "\\hline\n";
    _final += "\\end{tabular}\n";
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