import React, { useState } from 'react';  
import { View, Text, Button, StyleSheet, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';  
import { createAppContainer } from 'react-navigation';  
import { createStackNavigator } from 'react-navigation-stack';  
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeArea } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import customData from './article_list.json';

class HomeScreen extends React.Component {  

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }
    }

    static navigationOptions = {  
        title: 'Home',  
        headerStyle: {  
        backgroundColor: '#66f2a3',  
    },  
      //headerTintColor: '#0ff',  
    headerTitleStyle: {  
        fontWeight: 'bold',  
    },  
  };  

  render() {  
      return (  
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
              <Text style = "position:absolute; left:80px; top:20px; ">Username</Text>  
              <TextInput style={styles.inputStyle} 
                        onChangeText = {(username) => this.setState({username})}
                        value = {this.state.username}
              />
              <Text>Password</Text>
              <TextInput style={styles.inputStyle} 
                        onChangeText = {(password) => this.setState({password})}
                        value = {this.state.password}
              />
              <Button  
                  title="Go to Profile"  
                  onPress={() => this.props.navigation.push('Profile')}  
              />  
          </View>  
      );  
  }  
}  
class ProfileScreen extends React.Component {  

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            datasource: []
        }
    }
    // https://jsonplaceholder.typicode.com/posts
//https://newsapi.org/v2/top-headlines?country=us&apiKey=fb1f785f985e46d6ad098ace44d65533
    componentDidMount(){
        fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=fb1f785f985e46d6ad098ace44d65533")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson.articles
          })
        }).catch(error=>console.log(error)) //to catch the errors if any
    }
    
    
    static navigationOptions = ({ navigation }) => {  
        return {  
            title: navigation.getParam('otherParam', 'News Reader'),  
            headerStyle: {  
                backgroundColor: '#66f2a3',  
            },  
        };  
        
        
    };  
    renderItem=(data)=>
    <TouchableOpacity style={styles.item}
     onPress={() => this.props.navigation.push('Detail', {
         JSON_ListView_Clicked_Item: data.item})
         } >
    {/* <Image source = {Image_Http_URL} style = {styles.imageHttp}/> */}
    <View style = {styles.boxItem}>
        <Image source = {{uri: data.item.urlToImage}} style = {{height: 75, width: 75, resizeMode: 'stretch', margin: 5}}/>
        <View styles = {styles.boxItemText}>
            <Text style={styles.headingText} >{data.item.title}</Text>
        </View>
    </View>
    </TouchableOpacity>
    
    
    render() {  
        // let Image_Http_URL = {uri: this.state.datasource.item.urlToImage};    
        // const { navigate } = this.props.navigation;
        if(this.state.loading){
            return( 
            <View style={styles.container}>
            <ActivityIndicator size="large" color="#0c9"/>
            </View>
          )}
        
        return (
            <View style={styles.container}>  

            <FlatList 
            showsVerticalScrollIndicator = {false}
            data = {this.state.dataSource}
            renderItem= {item=> this.renderItem(item)}
            keyExtractor= {item=>item.publishedAt.toString()}
            />

          </View>  
  )}  
}  

class DetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {  
        return {  
            title: navigation.getParam('otherParam', 'Story'),  
            headerStyle: {  
                backgroundColor: '#66f2a3',  
            }, 
        };  
        
        
    }; 
    


    render() {
        const {navigate} = this.props.navigation;
        
        // let Image_Http_URL = {uri: this.props.navigation.state.params.JSON_ListView_Clicked_Item.urlToImage ? this.props.navigation.state.params.JSON_ListView_Clicked_Item.urlToImage
            // : 'No Value Passed'};
        return (
            
            <View style = {styles.detailContainer}>
                <Image source = {{uri: this.props.navigation.state.params.JSON_ListView_Clicked_Item.urlToImage}} style = {styles.imageStyle}/>
                <Text style = {styles.headingText}>{this.props.navigation.state.params.JSON_ListView_Clicked_Item.title
                ? this.props.navigation.state.params.JSON_ListView_Clicked_Item.title
                : 'No Value Passed'}</Text>
                <Text style = {styles.bodyText}>{this.props.navigation.state.params.JSON_ListView_Clicked_Item.content
                ? this.props.navigation.state.params.JSON_ListView_Clicked_Item.content
                : 'No Value Passed'}</Text>
            </View>
        );
    }
    
    
}

const styles = StyleSheet.create({
    inputStyle:{
        height : 40,
        width : 320,
        backgroundColor : "#65f7a5",
        borderWidth : 1,
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        height: 220,
        marginHorizontal: 10,
         width: 350,
        marginTop: 24,
        padding: 20,
        backgroundColor: '#65f7a5',
        fontSize: 24,
        borderColor: 'black',
        borderWidth: 2,
      },
    boxItem: {
        flex: 1,
        flexDirection: 'row',
        width: 300,
        height: 200,
        // borderColor: 'black',
        // borderWidth: 1,
    },
    boxItemText: {
        width: 150,
        height: 190,
        flexWrap: 'wrap',
        flexShrink: 0,
        borderColor: 'red',
        borderWidth: 1,
    },
    headingText: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    bodyText: {
        margin: 0,
        flex: 1,
        fontSize: 14,
        padding: 0
    },
    detailBodyText: {
        margin: 0,
        
        fontSize: 14,
        padding: 0
    },
    detailContainer: {
        borderColor: '#65f7a5',
        borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 200,
        resizeMode: 'stretch',
        margin: 5,
        alignSelf: "stretch",
    },
    
});
const AppNavigator = createStackNavigator(  
  {  
      Home: HomeScreen,  
      Profile: ProfileScreen,
      Detail: DetailScreen
  },  
  {  
      initialRouteName: "Home"  
  }  
);  

const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
  render() {  
      return <AppContainer />;  
  }  
}  