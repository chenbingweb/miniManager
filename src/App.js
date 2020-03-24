
import React,{useEffect,useState} from 'react';
import './App.css';
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/search-bar"
import Tab from "./components/tab"
import List from "./components/list"
import Appid from "./components/appid"
import Setting from "./components/setting"
import code from "./images/code.png"
import { readFileInfo,getFileInfo } from './utils/utils'
const { ipcRenderer } = window.require('electron');

function App() {
  let [list,setList] = useState({});//小程序列表
  let [fetch,setFetch] = useState(false);
  let [currentItem,setItem] = useState({})
  
  //获取小程序列表
  useEffect( ()=>{
    let paths =  localStorage.getItem('filePaths')||JSON.stringify([])
    paths = JSON.parse(paths);
    let list ={};
    getFileInfo(paths,'/project.config.json',(infos)=>{
      infos.forEach((item,i)=>{
        item.projectname = decodeURIComponent(item.projectname)
        list[i]=item
      })
      setList(list)
    })()
    ipcRenderer.on('selectFile', async (event, arg) => {
   
      let {  filePaths,canceled } = arg; 
      if(canceled==false)
      {
        filePaths.forEach(item=>{
          if(paths.includes(item)==false)
          {
            paths.push(item)
          }
        })
        localStorage.setItem("filePaths",JSON.stringify(paths) )

        try
        {
          
          for(let i=0;i<filePaths.length;i++)
          {
            
            let info = await readFileInfo(filePaths[i]+'/project.config.json');
            info = JSON.parse(info)
           
            info.projectname = decodeURIComponent(info.projectname)
            list[i] = info;
          }
          setFetch(true)
          setList(list)
          console.log(list)
          
       
        }catch(err){
          console.log('读取文件错误')
        }
      }
      
     
    })
 
    return ()=>{
      setFetch(false)
    }
    

  },[fetch])
  

  return (
    <div className="app ">
      <h1 className="bg-primary text-white title">小程序管理</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <Search
              searchFn={val=>{
                console.log(val)
             
              }}
            />
            <Tab/>
            <List 
              list={list}
              selectFn={(item)=>{
                  console.log(item)
                  setItem(list[item])
              }}
            />
            <div className="btn-group mt-2 px-0" style={{width:'100%'}}>
              <button type="button" className="btn btn-info " onClick={e=>{
                e.preventDefault();
                ipcRenderer.send('openFile', 'ping')
              }}>添加小程序</button>
            </div>
          </div>
          <div className="col-6 p-0">
            <div className="btn-group mt-2" style={{width:'100%'}} role="group" aria-label="Basic example">
                <button type="button"  data-ty="test" className="btn btn-success mr-3">上传</button>
                <button data-ty="online" type="button" className="btn btn-success" onClick={e=>{
                  e.preventDefault();
                  
                  ipcRenderer.send('preView', {
                    
                  })

                }}>预览</button>
            </div> 
            <div className="d-flex justify-content-center">
              <img src={code}/>
            </div>
            
          </div>
          <div className="col-3 p-0">
            <Appid item={currentItem}/>
            <Setting callBack={(val)=>{
              console.log(val)
            }}/>

          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;

