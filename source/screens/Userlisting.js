import React from 'react';
import { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from '@react-native-community/netinfo';

class UserListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        }
        this.unsubscribe = null;
    }
    componentDidMount() {
        unsubscribe = NetInfo.addEventListener(state => {
            //console.log("Is connected?", state.isConnected);
            this.setState({ isConnected: state.isConnected })
        });
    }

    componentWillUnmount() {
        if (unsubscribe != null) unsubscribe()
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle={(this.state.isConnected) ? "light-content" : "dark-content"} backgroundColor={(this.state.isConnected) ? "green" : 'red'} />
                <FlatList
                    data={this.props.user.users_array}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('UserForm', { userInfo: item })}>
                            <View style={{ backgroundColor: 'skyblue', margin: 4, padding: 10 }}>
                                <Text style={{ fontSize: 16, color: '#707070' }}>
                                    {"Name:"}{" "}{item.name}
                                </Text>
                                <Text style={{ fontSize: 16, color: '#707070' }}>
                                    {"Email:"}{" "}{item.email}
                                </Text>
                                <Text style={{ fontSize: 16, color: '#707070' }}>
                                    {"Age:"}{" "}{item.age}
                                </Text>
                                <Text style={{ fontSize: 16, color: '#707070' }}>
                                    {"Gender:"}{" "}{item.gender}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = () => {
    return bindActionCreators({

    });
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);