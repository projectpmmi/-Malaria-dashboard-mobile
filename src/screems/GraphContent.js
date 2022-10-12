import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import i18n from "i18n-js";
import * as Print from "expo-print";
import { useSelector } from "react-redux";

const GraphContent = (props) => {
  const viewShot = useRef();
  const [html, setHtml] = useState();
  const [option, setOption] = useState();
  const graph = useSelector((state) => state.chart.chartData1);
  let data = graph.data;
  useEffect(() => {
    (async () => {
      let htmlData = await htmltable();
      //console.log("=======htmlData=======", htmlData);
      setHtml(htmlData);

      let optionBuild = {
        title: {
          text: graph.titre,
          //subtext: "Example in MetricsGraphics.js",
          left: "center",
          padding: [
            30, // up
            10, // right
            5, // down
            10, // left
          ],
        },
        tooltip: {
          show: true,
          trigger: "axis",
          position: ["50%", "50%"],
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: data.series.map((elt) => elt.name),
          type: "scroll",
          orient: "horizontal",
          //y: "bottom",
          //data:["Bo","Bombali","Bonthe","Kailahun","Kambia","Kenema","Koinadugu","Kono","Moyamba","NACP Training","Port Loko","Pujehun","Tonkolili","Western Area"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.headers,
          axisLabel: {
            color: "#000",
            interval: 0,
            formatter: function (params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 15;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
          },

          axisTick: {
            alignWithLabel: true,
          },
          //data:["Malaria referrals","Malaria treated ","Malaria treated at ","Malaria treated at PHU without ","Malaria treated in community with "]
        },
        yAxis: {
          type: "value",

          //boundaryGap: [0, 0.01]
        },
        series: data.series.map((elt) => {
          return { name: elt.name, data: elt.data, type: "bar" };
        }),
      };
      console.log("=========optionBuild=======", JSON.stringify(optionBuild));
      setOption(optionBuild);
    })();
  }, []);

  const buildData = async () => {
    let titres = ["Indicateurs"];
    let rows = [];
    let headers = data.headers;
    data.series.map((elt) => {
      titres.push(elt.name);
    });

    for (var i = 0, c = headers.length; i < c; i++) {
      let row = [];
      row.push(headers[i]);
      data.series.map((serie) => {
        let data = serie.data;
        row.push(data[i]);
      });
      rows.push(row);
    }

    return { titres: titres, lignes: rows };
  };

  const htmltable = async () => {
    let tableData = await buildData();
    let header = tableData.titres;
    let titres = "";
    let rows = "";

    header.map((elt, index) => {
      titres = titres + `<th key=${index}>${elt}</th>`;
    });

    tableData?.lignes.map((ligne, index) => {
      rows =
        rows +
        `<tr key=${index}>
          ${ligne.map((elt, cellIndex) => {
            return `<td key=${cellIndex}>${elt}</td>`;
          })}
        </tr>`;
    });

    //console.log("=======rows=======", rows);

    let htmlContent = `<html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                        </head>
                        <body style="text-align: center;">
                          <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                            Hello Expo!
                          </h1>

                          <table>
                            <thead>
                              <tr>
                              ${titres}
                              </tr>
                            </thead>
                            <tbody>
                            ${rows}
                            </tbody>
                          </table>
                        </body>
                      </html>`;

    return htmlContent;
  };

  const onShare = async () => {
    await viewShot.current.capture().then((uri) => {
      console.log("do something with ", uri);
      //setLien(uri)
      Sharing.shareAsync(uri);
      //onShare(uri)
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.

    //console.log("=======html======", html);

    try {
      const { uri } = await Print.printToFileAsync({
        html,
      });
      console.log("File has been saved to:", uri);
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.posit}>
        <Button
          icon={<Icon name="share-alt-square" size={20} color="white" />}
          title={i18n.t("share-button")}
          onPress={onShare}
        />
        <Button
          icon={<Icon name="file-pdf-o" size={20} color="white" />}
          title="Export Data"
          onPress={printToFile}
        />
      </View>
      <ViewShot ref={viewShot} style={styles.chartContainer}>
        <View style={styles.view_container}>
          <ECharts option={option} backgroundColor="rgba(93, 169, 81, 0.3)" />
        </View>
      </ViewShot>
    </>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
  container: {
    height: 500,
    display: "flex",
    //width: 400,
    backgroundColor: "#fff",
    justifyContent: "center",
    //marginTop: 10,
  },
  view_container: {
    backgroundColor: "#fff",
    flex: 1,
    //marginTop:-50
    //justifyContent:"space-around",
    //alignItems: 'center',
  },
  posit: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5,
  },
});

export default GraphContent;
