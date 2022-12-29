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
    campo += `<input type="radio" name="estilo" id="tab" checked>`;
    campo += `<label for="tab">Tabela</label>`;
    campo += `<input type="radio" name="estilo" id="quad">`;
    campo += `<label for="quad">Quadro</label>`;
    campo += `</fieldset>`;
    

    document.querySelector('#respostaDados').innerHTML = (titulo+tabela+campo);

    document.querySelector('#bt-converter').innerHTML = `<input type='button' value='Converter Valores' onclick='codigo(${linhasUsr},${colunasUsr})'>`;


    
}

function limparCampos(){
    document.querySelector('#linhas').value = ''
    document.querySelector('#colunas').value = ''
}


function codigo(qLinhas, qColunas) {


  
    resultado = "<textarea rows='10' cols='40' maxlength='500'>";

    resultado+= header(qColunas);
    for(l = 0; l < qLinhas; ++l) {
            for(c = 0; c < qColunas; ++c) {
                let valor = document.querySelector(`#v${l}${c}`).value

                if(c < qColunas-1) {
                    resultado+= `${valor} & `;
                }
                else {
                    resultado+= valor;
                }
                
            }
        resultado+=" \\\\ \n"
    }

    resultado+= final();

    resultado+="</textarea>";


    document.querySelector('#table-latex').innerHTML = resultado;
  
}

function header(colunas) {

    let titulo = document.querySelector('#captionTabela').value;

    col = 0;
    formatoTabular = "";
    do {
        formatoTabular+='c';
        ++col;
    } while(col < colunas);

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