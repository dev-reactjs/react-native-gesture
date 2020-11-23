import React from 'react';
import {
    FlatList,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Separator } from "./Listitem";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center"
    },
    viewList: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    text: {
        color: '#4a4a4a',
        fontSize: 15,
    }
});
export default class TrashScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            Loading: true
        }

    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('focus', this.List);
    }
    List = async () => {
        try {
            let user = await AsyncStorage.getItem('deleted');
            var parsed = JSON.parse(user);
        } catch (error) {
            this.setState({ isInnerLoading: false });
        }
        if (parsed.deleted.length !== 0) {
            this.setState({ Loading: false, dataList: parsed.deleted })
        } else {
            this.setState({ Loading: false })
        }

        AsyncStorage.setItem('deleted', JSON.stringify({ deleted: [] }));
        this.listView()
    }
    listView = () => {
        return (<View>
            <FlatList
                data={this.state.dataList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.viewList}>
                            <Text style={styles.text}>
                                {item.text}
                            </Text>
                        </View>

                    )
                }}
                ItemSeparatorComponent={() => <Separator />}
            />
        </View>)

    }

    render() {
        let { Loading } = this.state
        if (Loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        } else {
            return (<View>
                {this.listView()}
            </View>

            );
        }

    }
}

