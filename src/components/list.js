import React from 'react'
import PropTypes from 'prop-types';
export default function List({list,selectFn}) {
    console.log('list')
    return (
        <ul className="list-group pl-2 mt-2 scroll-y" style={{height:'65vh'}}>
            {
                Object.keys(list).length?
                Object.keys(list).map(item=>{
                    return <li key={list[item].appid} className="list-group-item" onClick={e=>{
                        e.preventDefault();
                        
                        selectFn && selectFn(item)
                    }}>{list[item].projectname}</li>
                })
                :<div>暂无数据</div>
            }
            
            
        </ul>
    )
}
PropTypes.proTyoes={
    list:PropTypes.object,
    selectFn:PropTypes.func.isRequired
}
