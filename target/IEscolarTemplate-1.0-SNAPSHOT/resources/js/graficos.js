/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * SCRIPTS BÁSICO PARA A CHAMADA DAS FUNÇÕES (CHAMADO PARA TODOS OS GRÁFICOS)
 * @returns {undefined}
 */
//<script src="http://code.highcharts.com/highcharts.js" />

/**
 * SCRIPTS PARA A CHAMADA DAS FUNÇÕES DO GRÁFICO DE DRILLDOWN
 * @returns {undefined}
 */
//<script src="http://code.highcharts.com/modules/data.js" />
//<script src="http://code.highcharts.com/modules/drilldown.js" />

/**
 * SCRIPTS PARA A CHAMADA DAS FUNÇÕES DO GRÁFICO DE PIZZA, LINHA
 * @returns {undefined}
 */
//<script src="http://code.highcharts.com/modules/exporting.js" />

/**
 * API DE REFERÊNCIA
 * http://api.highcharts.com/highcharts#drilldown
 */

/**
 * Método para a criação de um gráfico do tipo DrillDown em colunas.
 * Os dados serão exibidos em colunas e, quando forem clicadas,
 * será carregado um novo nível no gráfico em colunas.
 * @param {type} titulo
 * @param {type} seriesDrill
 * @param {type} dataDrill
 * @returns {undefined}
 */
function createGraficoDrillDown(titulo, seriesDrill, dataDrill) {

    Highcharts.setOptions({
        lang: {
            drillUpText: 'Voltar para {series.name}'
        }
    });
    $('#graff').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: titulo
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: 'Clique na coluna para detalhar as matrículas da escola.'
        },
        xAxis: {
            type: 'category'
//            labels: {
//                rotation: -80
//            }
        },
        yAxis: {
            title: {
                text: 'Percentual de matrículas'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f} matrícula(s)</b> <br/>'
        },
        series: [{
                name: "Escola",
                colorByPoint: true,
                data: seriesDrill
            }],
        drilldown: {
            series: dataDrill,
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                }
            }
        }
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} titulo
 * @param {type} subtitulo
 * @param {type} seriesDrill
 * @returns {undefined}
 */
function createColunas(nomeSerie, titulo, subtitulo, seriesDrill) {

    Highcharts.setOptions({
        lang: {
            drillUpText: 'Voltar para {series.name}'
        }
    });
    $('#graff').highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Percentual de matrículas'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f} matrícula(s)</b> <br/>'
        },
        series: [{
                name: nomeSerie,
                colorByPoint: true,
                data: seriesDrill
            }]
    });
}

    /**
 * 
 * @param {type} nomeSerie
 * @param {type} titulo
 * @param {type} subtitulo
 * @param {type} seriesDrill
 * @returns {undefined}
 */
function createMedias(nomeSerie, titulo, subtitulo, seriesDrill) {

    Highcharts.setOptions({
        lang: {
            drillUpText: 'Voltar para {series.name}'
        }
    });
    $('#graff').highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Medias'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>Média:{point.value:.0f}</b> <br/>'
        },
        series: [{
                name: nomeSerie,
                colorByPoint: true,
                data: seriesDrill
            }]
    });
}

/**
 * Método para a criação de um gráfico do tipo Pizza simples
 * @param {type} titulo
 * @param {type} seriesPizza
 * @returns {undefined}
 */
function createGraficoPizzaSimples(titulo, seriesPizza) {

    // Build the chart
    $('#graff').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.value:.0f} matrícula(s)</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.2f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
                name: "Total",
                data: seriesPizza
            }]
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} titulo
 * @param {type} subTitulo
 * @param {type} serieDrill
 * @param {type} dataDrill
 * @returns {undefined}
 */
function createGraficoCrescimentoMatriculasDrill(nomeSerie, titulo, subTitulo, serieDrill, dataDrill) {
    Highcharts.setOptions({
        lang: {
            drillUpText: 'Voltar para {series.name}'
        }
    });
    $('#graff').highcharts({
        title: {
            text: titulo
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: subTitulo
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Totais de matrícula(s)'
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f} matrícula(s)</b> <br/>'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            enabled: false
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'
                }
            }
        },
        series: [{
                name: nomeSerie,
                data: serieDrill
            }],
        drilldown: {
            series: dataDrill,
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 30,
                    x: 0
                }
            }
        }
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} titulo
 * @param {type} serieDrill
 * @returns {undefined}
 */
function createGraficoPercentualMatriculasMes(nomeSerie, titulo, serieDrill) {
    $('#graff').highcharts({
        title: {
            text: titulo
        },
        xAxis: {
            type: 'category'
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'Totais de matrícula(s)'
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f} matrícula(s)</b> <br/>'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            enabled: false
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}%'
                }
            }
        },
        series: [{
                name: nomeSerie,
                data: serieDrill
            }]
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} titulo
 * @param {type} subTitulo
 * @param {type} serieDrill
 * @param {type} dataDrill
 * @returns {undefined}
 */
function createGraficoTotalMatriculasPorZona(nomeSerie, titulo, subTitulo, serieDrill, dataDrill) {
    Highcharts.setOptions({
        lang: {
            drillUpText: 'Voltar para {series.name}'
        }
    });
    // Create the chart
    $('#graff').highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: subTitulo
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Percentual de matrículas'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f}</b> matrícula(s)<br/>'
        },
        series: [{
                name: nomeSerie,
                colorByPoint: true,
                type: 'pie',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}%'
                },
                data: serieDrill
            }],
        drilldown: {
            series: dataDrill,
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 25,
                    x: 0
                }
            }
        }
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} titulo
 * @param {type} subTitulo
 * @param {type} serieDrill
 * @param {type} dataDrill
 * @returns {undefined}
 */
function createGraficoDesempenhoEscolar(nomeSerie, titulo, subTitulo, serieDrill, dataDrill) {
    Highcharts.setOptions({
        lang: {
            drillUpText: 'Voltar para {series.name}'
        }
    });
    // Create the chart
    $('#graff').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: subTitulo
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Percentual de matrículas'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> média<br/>'
        },
        series: [{
                name: nomeSerie,
                colorByPoint: true,
                type: 'bar',
                data: serieDrill
            }],
        drilldown: {
            series: dataDrill,
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 25,
                    x: 0
                }
            }
        }
    });
}

/* FUNÇÕES PARA GRÁFICOS DO PAINEL PRINCIAPL */
/**
 * 
 * @param {type} nomeSerie
 * @param {type} serieDrill
 * @returns {undefined}
 */
function createGraficoTotalMatriculasPorZonaPainel(nomeSerie, serieDrill) {
    // Create the chart
    $('#graff-matricula-zona').highcharts({
        chart: {
            backgroundColor: '#f9f9f9',
            type: 'pie',
            height: 266,
            width: 320
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Total de matrículas por zonas'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Percentual de matrículas'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            pie: {
                center: [130, 60],
                minSize: 100
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    distance: 0,
                    format: '{point.name}<br>{point.y:.2f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f}</b> matrícula(s)<br/>'
        },
        series: [{
                allowPointDrilldown: false,
                name: nomeSerie,
                colorByPoint: true,
                data: serieDrill
            }]
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} serieDrill
 * @returns {undefined}
 */
function createGraficoComparativoTotalMatriculasPainel(nomeSerie, serieDrill) {
    $('#graff-matriculas-ano').highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#f9f9f9',
            height: 266,
            width: 320
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Comparativo de Matrículas'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total de Matrículas (k = mil)'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.0f} matrícula(s)</b> <br/>'
        },
        series: [{
                name: nomeSerie,
                colorByPoint: true,
                data: serieDrill
            }]
    });
}

/**
 * 
 * @param {type} nomeSerie
 * @param {type} serieDrill
 * @returns {undefined}
 */
function createGraficoDesempenhoEscolarMunicipalPainel(nomeSerie, serieDrill){
    $('#graff-desempenho-escolar').highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#f9f9f9',
            height: 266,
            width: 320
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Desempenho Escolar Municipal'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Desempenho Escolar Municipal.'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value:.2f} média</b> <br/>'
        },
        series: [{
                name: nomeSerie,
                colorByPoint: true,
                data: serieDrill
            }]
    });
}