import React ,{useState,useEffect,useRef} from 'react'

export default function Setting({callBack}) {
    let setList = [
        {
            name:'es6',//对应于微信开发者工具的 "es6 转 es5"
            id:'es6',
            checked:false
        },
        {
            name:'es7',//对应于微信开发者工具的 "增强编译"
            id:'es7',
            checked:false
        },
        {
            name:'上传时压缩 JS 代码',//上传时压缩 JS 代码
            id:'minifyJS'
        },
        {
            name:'上传时压缩 WXML 代码',//上传时压缩 WXML 代码
            id:'minifyWXML'
        },
        {
            name:'上传时压缩 WXSS 代码',//上传时压缩 WXSS 代码
            id:'minifyWXSS'
        },
        {
            name:'上传时压缩所有代码',//上传时压缩 WXSS 代码
            id:'minify'
        },
        {
            name:'上传时进行代码保护',//上传时压缩 WXSS 代码
            id:'codeProtect'
        },
        {
            name:'上传时样式自动补全',//上传时压缩 WXSS 代码
            id:'autoPrefixWXSS'
        }
    ]
    let [ arr,setArr ] = useState(setList);
    let [id ,setId] = useState(JSON.stringify({}));
   
    let { current } = useRef(setList);
   
    useEffect(()=>{
        console.log(current)
        current.forEach(item=>{
            if(item.id==JSON.parse(id).id)
            {
                if(item.checked)
                {
                    item.checked =false;
                }
                else
                {
                    item.checked =true;
                }
                
            }
        })
        callBack(current.filter(item=>item.checked))
        setArr(current)
        
    },[id])

    return (
        <ul className="list-group pl-2 scroll-y" style={{height:'70vh'}}>
            {
                arr.map(item=>{
                    return <li className="list-group-item" key={item.id}>
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" onChange ={e=>{
                                   
                                    setId( JSON.stringify(item) );
                                 
                                }}  className="custom-control-input" id={item.id}/>
            <label className="custom-control-label" htmlFor={item.id}>{item.name}</label>
                            </div>
                           </li>
                })
            }
            
           
            
        </ul>
    )
}
