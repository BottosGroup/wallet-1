import React,{PureComponent} from 'react'
import {View,StyleSheet,Text} from 'react-native'

import {RefreshState} from '../../Component/JLRefreshFlatList'
import BTRefreshFlastList from '../../Component/JLRefreshFlatList'

export default class BTAsset extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            refreshState:RefreshState.Normal,
            data:[
                {name:"john"},
                {name:"john"},
                {name:"john"},
                {name:"john"},
                {name:"john"},
                {name:"john"},
            ]
        }
    }

    onHeaderRefreshing(){
        this.setState({refreshState:RefreshState.onHeaderRefreshing})
        setTimeout(()=>{
            this.setState({refreshState:RefreshState.Normal})
        },3000)
    }

    onFooterLoadingMore(){
        this.setState({refreshState:RefreshState.onFooterLoadingMore})

        setTimeout(()=>{
            this.setState({refreshState:RefreshState.Normal})
        },3000)
    }

    render(){
        // alert(this.state.refreshState)
        return(
            <View style={styles.container}>
                <BTRefreshFlastList
                    data={this.state.data}
                    refreshState={this.state.refreshState}
                    renderItem={({item})=><View style={styles.itemStyle}/>}
                    onHeaderRefreshing={()=>{this.onHeaderRefreshing()}}
                    onFooterLoadingMore={()=>{this.onFooterLoadingMore()}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'white'},
    itemStyle:{height:150,alignSelf:'center',width:350,marginTop:20,backgroundColor:'red',borderRadius:25}
})