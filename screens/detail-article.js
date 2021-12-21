import React, { useEffect, useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    RefreshControl,
    Button,
    Alert,
    Modal
} from "react-native";
import { Card, CardItem, Body } from "native-base";
import { Authcontext } from "../context/auth-context";
import { useContext } from "react";
import { Spinner } from "native-base";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DetailArticle = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    const id = props.navigation.getParam("id");

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        const sendRequest = async () => {
            const response = await fetch(
                `http://192.168.1.46:5000/api/article/${id}`
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
                `http://192.168.1.46:5000/api/article/${id}`
            );

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setList(responseData.existingArticle);
        };
        sendRequest();
    }, []);

    const auth = useContext(Authcontext);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
       

        let response = await fetch(
            "http://192.168.1.46:5000/api/article/ajoutPanier",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idArticle: id,
                    idClient: auth.userId,
                    prix:list.prix
                }),
            }
        );

        if (!response.ok) {
            let responsedata = await response.json();
            Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
            setLoading(false);
            throw new Error(responsedata.message);
        }
        setLoading(false);
        Alert.alert("Message", "Votre demande est enregistrer", [
            { text: "fermer" },
        ]);
    };
    return (
        <View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {list && (
                    <View>
                        <Image
                            source={{ uri: `http://192.168.1.46:5000/${list.image}` }}
                            style={styles.image}
                        />
                        <View style={styles.details}>
                            <Text>{list.nom}</Text>
                            <Text>{list.categorie}</Text>
                            <Text>{list.ref}</Text>
                        </View>
                        <Card>

                            <CardItem>
                                <Body>
                                    <Text>{list.description}</Text>
                                    <Text>{list.prix}DT</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer>
                                <View style={styles.stocke}></View>
                            </CardItem>
                            {auth.userId &&
                                (loading ? (
                                    <Spinner />
                                ) : (
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            title="Ajouter aux panier"
                                            color="#1e88e5"
                                            onPress={submit}
                                        />
                                    </View>
                                ))}
                        </Card>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

DetailArticle.navigationOptions = {
    headerTitle: "Detail",
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
    },
    title: {
        fontSize: 22,
        textAlign: "center",
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default DetailArticle;
