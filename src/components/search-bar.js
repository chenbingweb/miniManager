import React ,{ useEffect,useState }from "react"
import PropTypes from 'prop-types';
function Search  ({title,searchFn}){
    let [val,setVal] = useState(title||'');
    
    console.log('search');

    return <>
            <div className="search_bar d-flex">
                <div className="form-group">
                    <label className="sr-only" >Email address</label>
                    <input type="text" value={val} onChange={e=>{
                        setVal(e.target.value);
                    }} className="form-control"  placeholder="请输入小程序名"/>
                </div>
                <div><button type="button" onClick={e=>{
                    e.preventDefault();
                    if(val.trim()!=='')
                    {
                        searchFn && searchFn(val)
                    }
                    
                }} className="btn btn-primary">搜索</button></div>
            </div>
          </>
}
PropTypes.propTypes={
    title:PropTypes.string,
    searchFn:PropTypes.func.isRequired
}
export default Search;