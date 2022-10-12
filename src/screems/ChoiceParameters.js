import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  Button,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../_services/DBService";

import NetInfo from "@react-native-community/netinfo";
import OrgUnitTree from "../_components/OrgUnitTree";
import RadioForm from "react-native-simple-radio-button";
import { saveGraphData, getGraphData } from "../_services/DBService";
import {
  getIndicatorsID,
  getGraphDataG1,
  transformDataG1,
  getGraphDataG2,
  transformDataG2,
  getGraphDataG3,
  transformDataG3,
} from "../_services/DataService";
import { checkInternet, displayLoading } from "../_helpers/Connection";
import i18n from "i18n-js";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  deleteChartData1,
  deleteChartData2,
  deleteChartData3,
  setChartData1,
  setChartData2,
  setChartData3,
} from "../_store/_feature/chart.slice";

const ChoiceParameters = (props) => {
  //moment.locale("fr");
  const dispatch = useDispatch();
  const dataStore = useSelector((state) => state.dataStore.dataStore);
  const user = useSelector((state) => state.user.user);

  const [period, setPeriod] = useState("LAST_12_MONTHS");
  const [group, setGroup] = useState("G1");
  const [ou, setOu] = useState("");
  const [ouName, setOuName] = useState();
  const [ouNameSelect, setOuNameSelect] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState();
  const [groupRadio, setGroupRadio] = useState(
    dataStore?.groups?.map((gpe) => {
      return { label: gpe.name, value: gpe.code };
    })
  );
  const [periodRadio, setPeriodRadio] = useState([
    { label: i18n.t("period-12"), value: "LAST_12_MONTHS" },
    { label: i18n.t("period-6"), value: "LAST_6_MONTHS" },
    { label: i18n.t("period-3"), value: "LAST_3_MONTHS" },
    { label: i18n.t("period-1"), value: "LAST_MONTH" },
  ]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showAD, setShowAD] = useState(false);

  useEffect(() => {
    checkInternet(setIsOnline);
  }, []);

  const choiceDate = async (event, dateChoice) => {
    //console.log("==========dateChoice=========", dateChoice);
    if (dateChoice != undefined) {
      let dateElt = dateChoice;
      let year = dateElt.getFullYear().toString();
      let month =
        String(dateElt.getMonth() + 1).length > 1
          ? String(dateElt.getMonth() + 1)
          : "0" + (dateElt.getMonth() + 1);
      let monthYear = year + month;
      //console.log("==========dateElt=========", monthYear);

      setPeriod(monthYear);
      //setShow(Platform.OS === "ios" ? true : false);
      setShow(false);
      //setShowAD(Platform.OS === "ios" ? false : true);
      setShowAD(true);
      setDate(dateElt);
    }
  };

  const choixMois = () => {
    setShowAD(false);
    setShow(true);
    let dateNow = new Date();
    let year = dateNow.getFullYear().toString();
    let month =
      String(dateNow.getMonth() + 1).length > 1
        ? String(dateNow.getMonth() + 1)
        : "0" + (dateNow.getMonth() + 1);
    let monthYear = year + month;
    //console.log("==========dateNow=========", monthYear);
    setPeriod(monthYear);
    //setShowAD(Platform.OS === "ios" ? false : true);
  };

  const setOrgUnit = (orgunit) => {
    orgunit = orgunit.split("-");
    let uid = orgunit[0];
    let lev = parseFloat(orgunit[1]);
    let nameOu = orgunit[2];
    let ouElt = uid + "-" + lev;
    //console.log("=======ouElt======", ouElt);
    setOu(ouElt);
    setOuName(nameOu);
    setOuNameSelect(nameOu + i18n.t("selected-ou"));
  };

  const getPeriodLabel = (period) => {
    switch (period) {
      case "LAST_12_MONTHS":
        return i18n.t("period-12");
      case "LAST_6_MONTHS":
        return i18n.t("period-6");
      case "LAST_3_MONTHS":
        return i18n.t("period-3");
      case "LAST_MONTH":
        return i18n.t("period-1");
      default:
        return period.substring(4, 6) + "-" + period.substring(0, 4);
    }
  };

  const groupeIndicator = async () => {
    let listElements = dataStore;
    //await console.log("===========listElements==========",listElements)
    //console.log("========orgunit submit======" + ou);
    //console.log("========period submit======" + period);
    //console.log("========group submit======" + group);
    //console.log("===========user==========", user);
    //console.log("===========ouName==========", ouName);

    let listUIDG1 = getIndicatorsID(listElements, group);

    if (listUIDG1 != "") {
      let dataChart = new Object();
      dataChart.url = user?.url;
      dataChart.uidOu = ou;
      dataChart.period = period;
      dataChart.group_ind = group;
      let valueData = new Object();
      //let name=this.manageName(group)
      //console.log("===========listElements==========",listElements.groups)
      let gpe = await listElements.groups.filter((elt) => elt.code === group);
      let name = gpe[0].name;
      let titre = gpe[0].titre + " \n pour " + getPeriodLabel(period);
      //console.log("===========gpe.name==========", gpe[0].name);
      //console.log("===========titre==========", titre);
      //console.log("===========period==========", period);

      let indicator = await listElements.indicator.filter(
        (elt) => elt.code_group === group
      );

      //await console.log("===========indicator==========" + JSON.stringify(indicator));

      await getGraphDataG1(
        listUIDG1,
        ou,
        period,
        user?.login,
        user?.pwd,
        user?.url
      )
        .then(async (results) => {
          //console.log("===========results==========",JSON.stringify(results.data))
          let graph = new Object();
          graph.name = name;
          graph.titre = titre;
          graph.data = await transformDataG1(results.data, await indicator);
          valueData.graph1 = graph;
        })
        .catch((error) => {
          console.log(error);
        });
      //await console.log("===========valueData.graph1==========",JSON.stringify(valueData.graph1))

      await getGraphDataG2(
        listUIDG1,
        ou,
        period,
        user?.login,
        user?.pwd,
        user?.url
      )
        .then(async (results) => {
          //console.log("===========results==========",JSON.stringify(results.data))

          let graph = new Object();
          graph.name = name;
          graph.titre = titre;
          graph.data = await transformDataG2(results.data, await indicator);
          valueData.graph2 = graph;
        })
        .catch((error) => {
          console.log(error);
        });

      await getGraphDataG3(
        listUIDG1,
        ou,
        period,
        user?.login,
        user?.pwd,
        user?.url
      )
        .then(async (results) => {
          //console.log("===========results==========",JSON.stringify(results.data));

          let graph = new Object();
          graph.name = name;
          graph.orgunitName = ouName;
          graph.titre = titre;
          graph.data = await transformDataG3(results.data, await indicator);
          valueData.graph3 = graph;
        })
        .catch((error) => {
          console.log(error);
        });

      dataChart.value = valueData;

      //console.log("======dataChart a voir=======", JSON.stringify(dataChart));
      if (
        dataChart.value.graph1 != undefined &&
        dataChart.value.graph2 != undefined &&
        dataChart.value.graph3 != undefined
      ) {
        await saveGraphData(dataChart);
        dispatch(setChartData1(dataChart.value.graph1));
        dispatch(setChartData2(dataChart.value.graph2));
        dispatch(setChartData3(dataChart.value.graph3));
      }

      setIsLoading(false);
      props.navigation.navigate("Charts");
    } else {
      setMessage(i18n.t("missing-indicator-message"));
      setIsLoading(false);
    }
  };

  const makeData = async () => {
    dispatch(deleteChartData1());
    dispatch(deleteChartData2());
    dispatch(deleteChartData3());

    await NetInfo.fetch().then(async (state) => {
      //console.log("Connection type", state.type);
      //console.log("Is connected? parameters", state.isConnected);
      let online = state.isConnected && state.isInternetReachable;

      setIsOnline(online);

      if (online) {
        await groupeIndicator();
      } else {
        let dataChart = new Object();
        dataChart.url = user?.url;
        dataChart.uidOu = ou;
        dataChart.period = period;
        dataChart.group_ind = group;

        await getGraphData(dataChart)
          .then((results) => {
            //console.log("======results getGraphData a voir=====", results);
            dispatch(setChartData1(results.graph1));
            dispatch(setChartData2(results.graph2));
            dispatch(setChartData3(results.graph3));
          })
          .catch((error) => console.log(error));
        setIsLoading(false);
        props.navigation.navigate("Charts");
      }
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (ou != "") {
      setMessage("");
      //console.log("========check==========");
      await makeData();
    } else {
      setMessage(i18n.t("missing-ou-message"));
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.posit}>
          <View style={styles.posit2}>
            <Text style={styles.titleText}>{i18n.t("lib-period")} </Text>
            <RadioForm
              radio_props={periodRadio}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#2196f3"}
              animation={true}
              onPress={(value) => {
                setPeriod(value);
                setShowAD(false);
              }}
            />

            <View>
              <View>
                <Button onPress={choixMois} title="Choix du mois" />
              </View>
              <View style={{ marginRight: 20, marginLeft: 20, flex: 1 }}>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    locale="fr-FR"
                    is24Hour={true}
                    display="default"
                    onChange={choiceDate}
                  />
                )}
                {showAD && (
                  <Text
                    style={{
                      margin: 10,
                      flex: 1,
                      fontSize: 16,
                      fontWeight: "bold",
                      backgroundColor: "#D6EAF8",
                      textAlign: "center",
                    }}
                  >
                    {moment(date).format("MMM YYYY")}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.posit2}>
            <Text style={styles.titleText}>{i18n.t("lib-group")} </Text>
            <RadioForm
              radio_props={groupRadio}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#2196f3"}
              /* labelStyle={{
            flex: 1,
            //fontSize:10,
            marginRight: 1               
          }} */
              animation={true}
              onPress={(value) => {
                setGroup(value);
              }}
            />
          </View>
        </View>

        <View style={styles.posit1}>
          <Text style={styles.titleText}>{i18n.t("lib-orgunit")}</Text>
          <Text style={styles.titleText2}>{ouNameSelect}</Text>
          <OrgUnitTree setOrgUnit={setOrgUnit} />
        </View>
        <View style={styles.posit1}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => onSubmit()}
          >
            <Text style={styles.loginText}>{i18n.t("submit-button")}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.posit1}>
          <Text style={styles.messagetext}>{message}</Text>
        </View>

        {displayLoading(isLoading)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#DCDCDC",
    marginTop: 10,
  },
  posit: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  posit1: {
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    alignItems: "center",
  },
  posit2: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#E0F2F7",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#0174DF",
    textAlign: "center",
    color: "#EFFBFB",
  },
  titleText2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1890F5",
    backgroundColor: "#FCD420",
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  messagetext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: "white",
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChoiceParameters;
