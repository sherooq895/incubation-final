const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/signUpModels')
const formTemplateCopy = require('../models/FormModel')
const LoginTemplateCopy = require('../models/LoginModel')
const slotTemplateCopy = require('../models/slot')
// const AdminLoginCopy=require('../models/AdminLogModel')
const { response, json } = require('express')
const jwt=require('jsonwebtoken')




function veryfyToken(req,res,next){
   let authHeader=req.headers.authorization;
   if(authHeader==undefined){
      res.status(401).send({error:'no token provided'})
   }

   let token=authHeader.split(" ")[1]

   jwt.verify(token,"secret",function(err,decoded){
      if(err){
         res.status(500).send({error:'Authentication failed'})
      }else{
         res.send(decoded)
         next();
      }
   })


}



router.post('/signup', (request, response) => {

   const signedUpUser = new signUpTemplateCopy({

      name: request.body.name,
      email: request.body.email,
      password: request.body.password

   })

   signedUpUser.save()
      .then(data => {
         response.json({ message: "success" })
      })
      .catch(error => {
         response.json({ message: "fail" })
      })
})


router.post('/form', (request, response) => {
   console.log("request.body");
   console.log(request.body);

   const formuser = formTemplateCopy({
      name: request.body.name,
      lastname: request.body.lastname,
      email: request.body.email,
      streetaddress: request.body.streetaddress,
      city: request.body.city,
      state: request.body.state,
      pin: request.body.pin,
      companyname: request.body.companyname,
      a: request.body.a,
      b: request.body.b,
      c: request.body.c,
      d: request.body.d,
      e: request.body.e,
      incubationType: request.body.incubationType,
      status: false,
      view: false

   })

   console.log("db");
   console.log(formuser);
   formuser.save().then(data => {
      response.json({ message: " formsuccess" })
   })
      .catch(error => {
         console.log("error.message");
         console.log(error.message);
         response.json({ message: "formfail" })
      })
})



router.post('/login', async (request, response) => {
   console.log(request.body)
   console.log(request.body.email)

   let user = await signUpTemplateCopy.findOne({ "email": request.body.email })
   console.log("user");
   console.log(user);

   if (user.password == request.body.password) {

      let resp={
         id:user._id,
         username:user.name
      }
      console.log(resp)
      console.log('resp')

      let token=jwt.sign(resp,"secret");

      response.status(200).json({ user,auth :true,token:token})

      
   } else {
      console.log("error");
      response.status(500).json({error:'ivalid username and password'})
   }

   console.log('signupdata sssss');


})

router.post('/Adminlog', (request, response) => {

   const admin = {
      username:'admin',
      email: 'admin@gmail.com',
      password: '123'
   }

   if (request.body.email == admin.email && request.body.password == admin.password) {


      let resp={
         email:admin.email,
         user:admin.username
       
      }
      console.log(resp)
      console.log('resp')

      let token=jwt.sign(resp,"secret");

      response.status(200).json({ admin: true ,auth :true,token:token})
   } else {
      console.log('error')
   }
})

router.get('/data', (request, response) => {

   formTemplateCopy.find().then((res) => {
      console.log('response')
      console.log(response)
      response.status(200).json(res)

   })

})




router.post('/approv', (request, response) => {
   console.log(request.body)
   console.log('request.body')

   formTemplateCopy.findOneAndUpdate({ _id: request.body.data }, { status: 'approved' }, { upsert: true }).then(() => {
      console.log('updated');
   })


})


router.post('/decline', (request, response) => {
   console.log(request.body)
   console.log('request.body')

   formTemplateCopy.findOneAndUpdate({ _id: request.body.data }, { status: 'decline' }, { upsert: true }).then(() => {
      console.log('updated');
   })


})







router.post('/view', (request, response) => {
   console.log('request.body')

   console.log(request.body)
   console.log('request.body')



   formTemplateCopy.findOneAndUpdate({ _id: request.body.id }, { view: 'true' }, { upsert: true }).then(() => {
      console.log('view updated');
   })

})


router.post('/slot', (request, response) => {

   const slot = slotTemplateCopy({
      slot_no: request.body.slot_no,
      is_booked: request.body.is_booked,
      company: request.body.company
   })

   slot.save().then((response) => {
      response.json({ message: " slot success" })
   }).catch((error) =>
      response.json(error))

})


router.get('/slotdata', (request, response) => {
   slotTemplateCopy.find().then((res) => {
      response.status(200).json(res)

   })

})

router.get('/statuschange', (request, response) => {
   // console.log(request.query)
  
   // console.log('request.body')
   slotTemplateCopy.findOneAndUpdate({slot_no:request.query.slot}, { $set:{
      is_booked: 'booked',
      company: request.query.company
   } }).then((res)=>
   response.status(200).json(res)

   )


   
})


router.get('/getcompdata', (request, response) => {
   console.log(request.query)

   slotTemplateCopy.find({slot_no:request.query.id}).then((res)=>{
      response.status(200).json(res)
   }
   )

 })

 router.get('/bookedstatus', (request, response) => {
   console.log(request.query)
  
   formTemplateCopy.findOneAndUpdate({ companyname: request.query.company }, { status: 'booked' }, { upsert: true }).then((res) => {
      console.log('updated');
      response.status(200).json(res)
   })


   
})


   





module.exports = router