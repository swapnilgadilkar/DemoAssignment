import { Formik } from 'formik';
import React from 'react';
import { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserDeails } from '../redux/action';
import RadioGroup from 'react-native-radio-button-group';
import * as Yup from 'yup';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const radiogroup_options = [
    { id: 0, label: 'Male' },
    { id: 1, label: 'Female' },
];

const registrationFormSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    name: Yup.string().required('Name is required').min(2, "Name must be 2 character"),
    age: Yup.string().required('Age is required')
});

class UserInfoEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.userInfo.id,
            name: this.props.route.params.userInfo.name,
            email: this.props.route.params.userInfo.email,
            age: this.props.route.params.userInfo.age,
            gender: (this.props.route.params.userInfo.gender === "Male") ? 0 : 1
        }
    }


    handleProfileUpdate = () => {

        const { name, email, age, id, gender } = this.state;
        let user_gender = gender.label;
        let data = {
            id: id,
            name: name,
            email: email,
            age: age,
            gender: user_gender
        }
        let users_array = this.props.user.users_array;
        let updatedArray = users_array.map((user) => {
            if (user.id === id) {
                return data;
            }
            else {
                return user;
            }
        });
        //console.log('updatearray', updatedArray);
        this.props.updateUserDeails(updatedArray);
        this.props.navigation.navigate("UserListing");
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#F4F5F7', marginTop: height * 0.1 }}>
                <Formik
                    initialValues={{ name: this.state.name, email: this.state.email, age: this.state.age }}
                    validationSchema={registrationFormSchema}
                    onSubmit={(values) => {
                        this.setState({
                            name: values.name,
                            email: values.email,
                            age: values.age
                        })
                        this.handleProfileUpdate()
                    }
                    }
                >
                    {(props) =>
                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={{ marginBottom: 10 }}>Name :</Text>
                                <TextInput
                                    value={props.values.name}
                                    onChangeText={props.handleChange('name')}
                                    style={{ width: width * 0.7, borderWidth: 1, borderColor: 'black' }}
                                />
                                <Text>
                                    {props.touched.name && props.errors.name}
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={{ marginBottom: 10 }}>Email :</Text>
                                <TextInput
                                    value={props.values.email}
                                    onChangeText={props.handleChange('email')}
                                    style={{ width: width * 0.7, borderWidth: 1, borderColor: 'black' }}
                                />
                                <Text>
                                    {props.touched.email && props.errors.email}
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={{ marginBottom: 10 }}>Age :</Text>
                                <TextInput
                                    value={props.values.age}
                                    onChangeText={props.handleChange('age')}
                                    style={{ width: width * 0.2, borderWidth: 1, borderColor: 'black' }}
                                />
                                <Text>
                                    {props.touched.age && props.errors.age}
                                </Text>
                            </View>
                            <Text style={{ marginBottom: 10 }}>Gender :</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <RadioGroup
                                    horizontal
                                    options={radiogroup_options}
                                    onChange={(option) => this.setState({ gender: option })}
                                    circleStyle={{
                                        width: 22,
                                        height: 22,
                                        borderColor: '#000',
                                        borderWidth: 0.8,
                                        marginRight: 10,
                                        fillColor: '#279315'
                                    }}
                                    activeButtonId={this.state.gender}
                                />
                            </View>
                            <View style={{ marginTop: height * 0.1 }}>
                                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }} onPress={() => props.handleSubmit()}>
                                    <Text style={{ color: 'white' }}>
                                        UPDATE YOUR PROFILE
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </Formik>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: width * 0.8,
    },
    inputBox: { width: width * 0.2, borderWidth: 1, borderColor: 'black' }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateUserDeails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit);