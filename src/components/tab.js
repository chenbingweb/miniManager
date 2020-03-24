import React,{ useEffect,useState } from 'react'

export default function Tab() {
    let [ select,setSelect ] = useState('test'); 

    return (
        <>
            <div className="btn-group" style={{width:'100%'}} role="group" aria-label="Basic example">
                <button type="button" onClick={e=>{
                    let {ty}= e.currentTarget.dataset;
                    setSelect(ty)
                }} data-ty="test" className={select=='test'?'btn btn-success':'btn btn-primary'}>测试版</button>
                <button onClick={e=>{
                    let {ty}= e.currentTarget.dataset;
                    setSelect(ty)
                }} data-ty="online" type="button" className={select=='online'?'btn btn-success':'btn btn-primary'}>线上版</button>
            </div>   
        </>
    )
}
