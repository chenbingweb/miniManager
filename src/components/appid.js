import React ,{ useEffect,useState }from "react"
import PropTypes from 'prop-types';
function Appid  ({item}){
    let [val,setVal] = useState('');
    console.log('appid',val)
    useEffect(()=>{
        setVal(item.appid||'');
        return ()=>{
            setVal("")
        }
       
    },[item])
    return <>
            <div className="search_bar d-flex">
                <div className="form-group">
                    <label className="sr-only" >Email address</label>
                    <input type="text" value={val} onChange={e=>{
                        setVal(e.target.value);
                    }} className="form-control"  placeholder="请输入小程序名"/>
                </div>
                <div><button type="button" onClick={e=>{
                    
                }} className="btn btn-primary" style={{width:'110px'}}>修改AppId</button></div>
            </div>
          </>
}
Appid.propTypes={
    item:PropTypes.object
}
export default Appid;