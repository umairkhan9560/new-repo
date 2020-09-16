const fileModel = require('../models/fileModel');.3
const multiparty = require('multiparty');
const fs = require('fs');


module.exports = {
    /**
     * Function Name :uploadFile
     * Description   : Upload file by user
     *
     * @return response
    */

   uploadFile:(req, res) => {
            var form = new multiparty.Form();
                    form.parse(req, (err, fields, files) => {
                        // console.log("files anf fields", files,fields)
                        if (err) {
                           console.log("Un supported format")
                        }
                        else {
                           try{
                               for(let index in files.file){
                                   let item = files.file[index]
                                   let fileName = item.originalFilename
                                fs.writeFileSync(__dirname +  `/data/file/${fileName}`,item);
                                let i = fileName.lastIndexOf(".")
                                let fileExtension =fileName.slice(i+1,fileName.length)
                                let obj ={
                                    fileName,
                                    fileExtension,
                                    fileUrl : "http://" + global.gConfig.host +":"+ global.gConfig.node_port + "/" + fileName                                   
                                } 
                                fileModel.create(obj, (saveErr, saveData) => {
                                    if (saveErr) {
                                       return res.send({responseCode:500, responseMessage:"Internal server error"})                                   
                                    }
                                    else {
                                        if(files.file.length-1 ==index){
                                           return res.send({responseCode:200, responseMessage:"Successfully uploaded",saveData})

                                        }
                                    
                                    }
                                })
                        
                               }
                              }catch(e){
                                console.log(e);
                              }
                        }
                    })       
        
    },
        /**
       * Function Name :getFile
       * Description   :get file by name
       *
       * @return response
     */

    searchByFileName: (req, res) => {
        try {
            fileModel.findOne({fileName:req.body.fileName,status:"ACTIVE"}, (err, data) => {
                if (err) {
                    return res.send({responseCode:500, responseMessage:"Internal server error"})    
                }
                else if (!data) {
                    return res.send({responseCode:404, responseMessage:"File not found"}) 
                }
                else {
                    return res.send({responseCode:200, responseMessage:"File found",data})   
                }
            })
        }
        catch (error) {
            return res.send({responseCode:500, responseMessage:"Internal server error"})  
        }
    },
}