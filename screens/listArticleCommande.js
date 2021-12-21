import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Button,
  Modal,
  Alert,
  Pressable,
  Picker,
} from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListArticleCommande = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const id = props.navigation.getParam("id");
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/article/commande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingArticle);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/article/commande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingArticle);
    };
    sendRequest();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Remboursement");
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((row) => (
          <View>
            <View style={styles.mealItem}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate({
                    routeName: "DetailArticle",
                    params: {
                      id: row._id,
                    },
                  });
                }}
              >
                <View>
                  <View style={{ ...styles.MealRow, ...styles.mealHeader }}>
                    <ImageBackground
                      source={{ uri: `http:/192.168.1.46:5000/${row.image}` }}
                      style={styles.bgImage}
                    >
                      <Text style={styles.title}>{props.title}</Text>
                    </ImageBackground>
                  </View>
                  <View style={{ ...styles.MealRow, ...styles.mealDetail }}>
                    <Text>{row.nom}</Text>
                    <Text>{row.region}</Text>
                    <Text>{row.prix}DT</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <Button
              title="Retourner l'article"
              color="#1e88e5"
              onPress={() => setModalVisible(true)}
            />
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Choisir le sujet de retour
                    </Text>
                    <Picker
                      selectedValue={selectedValue}
                      style={{ height: 50, width: 200 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }
                    >
                      <Picker.Item label="Echange" value="Echange" />
                      <Picker.Item
                        label="Remboursement"
                        value="Remboursement"
                      />
                    </Picker>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={async () => {
                        let response = await fetch(
                          `http://192.168.1.46:5000/api/demandeRetourArticle/ajout`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              sujet: selectedValue,
                              idCommande: id,
                              idArticle: row._id,
                            }),
                          }
                        );
                        let responsedata = await response.json();
                        if (!response.ok) {
                          Alert.alert("Message", "Failed !!", [
                            { text: "fermer" },
                          ]);
                          throw new Error(responsedata.message);
                        }
                        
                        Alert.alert(
                          "Message",
                          "Votre demandé est enregstrée",
                          [{ text: "fermer" }]
                        );
                      }}
                    >
                      <Text style={styles.textStyle}>Valider</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Fermer</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

ListArticleCommande.navigationOptions = (navData) => {
  return {
    headerTitle: "Articles",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    marginTop: 15,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ListArticleCommande;
