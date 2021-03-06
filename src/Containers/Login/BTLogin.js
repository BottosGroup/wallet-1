import React,{PureComponent} from 'react'
import {View,Text,TouchableOpacity,Clipboard} from 'react-native'
import {TextareaItem,Toast} from 'antd-mobile'
import BTInputItem from '../../Component/BTInputItem'
import BTButton from '../../Component/BTButton'
import {Actions} from 'react-native-router-flux'
import {createAccount} from '../../DB/AccountDB'
const BTCrypto = global.BTCrypto
const Kesytore = BTCrypto.keystore
const Storage = global.Storage

export default class BTLogin extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            keystore:'',
            password:''
        }
    }

    loginClick(){
        if(this.state.keystore == ''){
            Toast.fail('请粘贴keystore')
            return
        }
        if(this.state.password == ''){
            Toast.fail('请输入密码')
            return
        }
        Toast.loading("正在登录",5000)
        setTimeout(async()=>{
            let keystore = JSON.parse(this.state.keystore)
            try{
                let privateKey = Kesytore.recover(this.state.password,keystore)
                createAccount({account:keystore.account,keystore:this.state.keystore})
                Storage.save({key:'account',data:{
                    account:keystore.account,
                    data:{
                        keystore:this.state.keystore,
                        privateKey:BTCrypto.buf2hex(privateKey)
                    }
                }})
                if(privateKey){
                    Toast.success("登录成功")
                    Actions.reset('home')
                }
            }catch(error){
                Toast.fail('keystore与密码不匹配')
            }
        },1000)
    }

    async parseKeystore(){
        let keystore = await Clipboard.getString();
        this.setState({keystore})
    }
    
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Text style={{marginTop:12+44,fontSize:24}}>导入Keystore</Text>
                <TextareaItem style={{width:350,height:113,marginTop:23,alignSelf:'center',borderWidth:1,borderColor:'#EBEBEB'}} rows={5} placeholder="请先复制keystore到粘贴板" value={this.state.keystore}></TextareaItem>
                <TouchableOpacity onPress={()=>{this.parseKeystore()}}>
                    <Text style={{marginTop:7,alignSelf:'center',color:'#007AFF'}}>粘贴keystore</Text>
                </TouchableOpacity>
                <BTInputItem title="输入密码" placeholder="请输入6位以上字符" onChangeText={(password)=>{this.setState({password})}} secureTextEntry={true} textStyle={{color:'black'}} lineStyle={{backgroundColor:'#E5E5E5'}} inputStyle={{color:'black'}}/>
                <BTButton title="确认导入" style={{alignSelf:'center',marginTop:16,width:333,height:60,borderRadius:45}} onClick={()=>{this.loginClick()}}/>
            </View>
        )
    }
}