let fs2 = window.require('fs2')

//读取文件信息
export function readFileInfo(fileName){
    console.log(fileName)
    return new Promise((resolve,reject)=>{
        fs2.readFile(fileName).then(res=>{
            resolve(res.toString())
         }).catch(err=>{
            reject(err)
         })
    })
  
}
export function getFileInfo(arr,fileName,callback){
    let i = 0;
    let _arr = []
    return function inner(){
        if(i>=arr.length)
        {
            callback(_arr)
            return
        }
        readFileInfo(arr[i]+fileName).then(res=>{
            _arr.push(JSON.parse(res))
            i++
            inner()
        })
    }

}