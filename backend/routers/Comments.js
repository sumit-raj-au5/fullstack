const express = require('express')

const router = express.Router()
const CommentDB = require('../models/Comment')

router.post('/:id', async(req,res)=>{
    try{
        await CommentDB.create({
            question_id: req.params.id,
            comment: req.body.comment,
            user: req.body.user
        }).then((doc) =>{
            res.status(201).send({
                status:true,
                message:"Comment posted successfully"
            })
        })
            .catch((err) => {
                res.status(400).send({
                    status:false,
                    message: `Error while adding comment ${err}`
                })
            })
    }
    catch(err){
        res.status(500).send({
            status:false,
            message: `error while adding comments ${err}`
        })
    }
})

module.exports = router