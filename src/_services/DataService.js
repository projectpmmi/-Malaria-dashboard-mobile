import axios from "axios";

const getData = async (endpoint, login, pwd) => {
  return await axios.get(endpoint, {
    auth: { username: login, password: pwd },
  });
};

export const getMetadata = async (login, pwd, baseUrl) => {
  var endpoint = baseUrl + "/api/dataStore/qualitydashboard/settings";
  //console.log("===========endpoint==========" + endpoint);

  var response = await getData(endpoint, login, pwd);
  //console.log("==========response 2==========" + JSON.stringify(response.status));
  return response;
};

export const getOrgunitList = async (login, pwd, baseUrl) => {
  var endpoint =
    baseUrl +
    "/api/organisationUnits.json?userDataViewFallback=true&fields=id,displayName,level,children[displayName,level,id,children[displayName,level,id,children[displayName,level,id,children[displayName,level,id,children[displayName,level,id]]]]]&paging=false";
  var response = await getData(endpoint, login, pwd);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  //await console.info("=====organisation======",JSON.stringify(response.data.organisationUnits[0]))
  return response.data.organisationUnits;
};

export const getIndicatorsID = (DatastoreData, groupId) => {
  //console.log("===========DatastoreData=========="+JSON.stringify(DatastoreData))
  var elements = DatastoreData.indicator.filter(
    (elt) => elt.uid != null && elt.uid != "" && elt.code_group === groupId
  );
  //console.log("===========elements=========="+JSON.stringify(elements))
  var listUID = "";
  elements.map((item) => {
    if (!listUID.includes(item.uid)) {
      listUID = listUID === "" ? item.uid : listUID + ";" + item.uid;
    }
  });
  //console.log("===========listUID==========" + listUID);
  return listUID;
};

export const getGraphDataG1 = async (
  listUID,
  uidOU,
  period,
  login,
  pwd,
  baseUrl
) => {
  var uidOU = uidOU.split("-");
  var uid = uidOU[0];
  var lev = parseFloat(uidOU[1]);

  //console.log("===========period=========="+period)
  //console.log("===========uid graph=========="+uid)
  //console.log("===========lev graph=========="+lev)
  var level = getOuLevel(lev);

  var endpoint =
    baseUrl +
    "/api/analytics?dimension=ou:" +
    level +
    ";" +
    uid +
    "&dimension=dx:" +
    listUID +
    "&filter=pe:" +
    period;
  //console.log("===========endpoint=========="+endpoint)
  var response = await getData(endpoint, login, pwd);
  //await console.log('==========response=========='+JSON.stringify(response))
  return response;
};

export const transformDataG1 = async (dataJson, indicator) => {
  var data = dataJson;
  //await console.log('==========data transformDataG1=========='+JSON.stringify(data))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data?.metaData.dimensions.dx.map(async (idElt) => {
    var elt = data.metaData.items[idElt];
    //headers.push(elt.name)
    await indicator?.filter((row) => {
      if (row.uid === idElt) {
        //console.log("==========row.name==========" + JSON.stringify(row.name));
        headers.push(row.name);
      }
    });
  });

  data?.metaData.dimensions.ou.map((idOu) => {
    var rows = [];
    var orgData = new Object();
    var orgUnit = data.metaData.items[idOu];

    data.metaData.dimensions.dx.map((idElt) => {
      /* var listRow = data.rows;
      //console.log('==========listRow=========='+JSON.stringify(listRow))
      for (var i = 0, c = listRow.length; i < c; i++) {
        var row = listRow[i];
        if (row[0] === idElt && row[1] === idOu) {
          rows.push(parseFloat(row[2]));
        }
      } */
      let listRow = data.rows.filter(
        (row) => row.includes(idOu) && row.includes(idElt)
      );
      //console.log('==========listRow==========' + JSON.stringify(listRow))

      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log('======row a voir==========' + JSON.stringify(row))
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });
    orgData.name = orgUnit.name;
    orgData.data = rows;
    series.push(orgData);
  });

  dataGraph.headers = headers;
  dataGraph.series = series;
  //console.log('==========dataGraph chart=========='+JSON.stringify(dataGraph))

  return dataGraph;
};

export const getOuLevel = (lev) => {
  var ouLevel = lev;
  var level = "LEVEL-3";
  switch (parseInt(ouLevel)) {
    case 1:
      level = "LEVEL-2";
      break;
    case 2:
      level = "LEVEL-3";
      break;
    case 3:
      level = "LEVEL-4";
      break;
    case 4:
      level = "LEVEL-5";
      break;
    default:
      level = "LEVEL-3";
  }

  return level;
};

export const getGraphDataG2 = async (
  listUID,
  uidOU,
  period,
  login,
  pwd,
  baseUrl
) => {
  var uidOU = uidOU.split("-");
  var uid = uidOU[0];
  var lev = parseFloat(uidOU[1]);
  var level = getOuLevel(lev);

  //console.log("===========period2=========="+period)
  //console.log("===========uid graph2=========="+uid)
  //console.log("===========lev graph2=========="+lev)

  var endpoint =
    baseUrl +
    "/api/analytics?dimension=dx:" +
    listUID +
    "&dimension=ou:" +
    level +
    ";" +
    uid +
    "&filter=pe:" +
    period;
  //console.log("===========endpoint2=========="+endpoint)
  var response = await getData(endpoint, login, pwd);
  /* if (response.status === 'ERROR') {
        console.error(response.message)
        return
    } */
  return response;
};

export const transformDataG2 = async (dataJson, indicator) => {
  var data = dataJson;
  //console.log('==========item=========='+JSON.stringify(dataCompletude.metaData))
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.ou.map((idOu) => {
    let orgUnit = data.metaData.items[idOu];
    let name = orgUnit.name;
    //headers.push(orgUnit.name)
    headers.push({ idOu, name });
  });

  data.metaData.dimensions.dx.map(async (idElt) => {
    var rows = [];
    var eltData = new Object();
    var elt = data.metaData.items[idElt];

    /* data.metaData.dimensions.ou.map( (idOu)=>{
                var listRow=data.rows
                for (var i = 0, c = listRow.length; i < c; i++) {
                    var row=listRow[i]
                    if(row[0]===idElt && row[1]===idOu){                    
                        rows.push(parseFloat(row[2]))
                    }
                }
            }) */

    headers.map((orgunit) => {
      let listRow = data.rows.filter(
        (row) => row.includes(orgunit.idOu) && row.includes(idElt)
      );
      //console.log("======listRow a voir==========",listRow)
      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log("======row a voir==========",row)
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });

    //eltData.name = elt.name;
    await indicator?.filter((ind) => {
      if (ind.uid === idElt) {
        eltData.name = ind.name;
      }
    });

    eltData.data = rows;
    series.push(eltData);
  });
  let headerName = [];
  headers.map((header) => {
    headerName.push(header.name);
  });
  dataGraph.headers = headerName;
  dataGraph.series = series;
  //console.log('==========dataGraph Line=========='+JSON.stringify(dataGraph))

  return dataGraph;
};

export const getGraphDataG3 = async (
  listUID,
  uidOU,
  period,
  login,
  pwd,
  baseUrl
) => {
  var uidOU = uidOU.split("-");
  var uid = uidOU[0];

  var endpoint =
    baseUrl +
    "/api/analytics?dimension=pe:" +
    period +
    "&dimension=dx:" +
    listUID +
    "&filter=ou:" +
    uid +
    "&displayProperty=NAME";
  //console.log("===========endpoint ok==========" + endpoint);
  var response = await getData(endpoint, login, pwd);
  if (response.status === "ERROR") {
    console.error(response.message);
    return;
  }
  return response;
};

export const transformDataG3 = async (dataJson, indicator) => {
  var data = dataJson;
  //console.log("==========item==========" + JSON.stringify(data));
  var dataGraph = new Object();
  var headers = [];
  var series = [];

  data.metaData.dimensions.pe.map((pe) => {
    let period = data.metaData.items[pe];
    let name = period.name;
    headers.push({ pe, name });
  });

  data.metaData.dimensions.dx.map(async (idElt) => {
    var rows = [];
    var eltData = new Object();
    var elt = data.metaData.items[idElt];

    headers.map((periode) => {
      let listRow = data.rows.filter(
        (row) => row.includes(periode.pe) && row.includes(idElt)
      );
      //console.log('======listRow a voir==========',JSON.stringify(listRow))
      let row = listRow.length > 0 ? listRow[0] : [];
      //console.log('======row a voir==========', JSON.stringify(row))
      if (row.length > 0) {
        rows.push(parseFloat(row[2]));
      } else {
        rows.push(0);
      }
    });

    await indicator?.filter((ind) => {
      if (ind.uid === idElt) {
        eltData.name = ind.name;
      }
    });

    //eltData.name = elt.name
    eltData.data = rows;
    series.push(eltData);
  });

  let headerName = [];
  headers.map((header) => {
    headerName.push(header.name);
  });

  dataGraph.headers = headerName;
  dataGraph.series = series;
  //console.log('==========dataGraph Line==========' + JSON.stringify(dataGraph))

  return dataGraph;
};

export const buildGraphTableData = async (data) => {
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
