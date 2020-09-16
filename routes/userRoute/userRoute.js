const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController');


/**
 * @swagger
 * /api/v1/user/uploadFile:
 *   post:
 *     tags:
 *       - USER
 *     description: 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: file
 *         description: file
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Thanks, You have successfully uploaded.
 *       404:
 *         description: This file already exist already exists.
 *       500:
 *         description: Internal Server Error
 */
router.post('/uploadFile', userController.uploadFile)
/**
* @swagger
* /api/v1/user/searchByFileName:
*   post:
*     tags:
*       - USER
*     description: Check for Social 
*     produces:
*       - application/json
*     parameters:
*       - name: fileName
*         description: fileName
*         in: query
*         required: true
*     responses:
*       200:
*         description:File get successfully
*       404:
*         description: Invalid credentials
*       500:
*         description: Internal Server Error
*/
router.post('/searchByFileName',userController.searchByFileName)



module.exports = router;