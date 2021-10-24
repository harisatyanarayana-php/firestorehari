const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
admin.initializeApp({ credential: admin.credential.applicationDefault() })
  
var db = admin.firestore()



app.post("/customer", async (req, res) =>{
	
  var cname = req.body.customername;
  var cplace = req.body.customerplace;
  var cproduct=req.body.customerproduct;

  const noteSnapshot = await db.collection('customer').get();
  const count= noteSnapshot._size;
var newvalue = parseInt(count, 10) + 1;
var ToString = ""+ newvalue;
let data = {
  name: cname,
  place: cplace,
  product: cproduct,
  Customerid:newvalue
};

let setDoc = db.collection('customer').doc(ToString).set(data);

res.status(200).json({status:200,message:"success"});
  
});


app.get('/randomcustomer',async (req, res) => {
 
    const noteSnapshot = await db.collection('customer').get();
    const notes = [];
	const count= noteSnapshot._size;
    const randomgen=Math.floor((Math.random() * count));
	var randoms=(randomgen<=1)? 1:randomgen;
	var ToString = ""+ randoms;
	let data = db.collection('customer').doc(ToString).get() 
    .then(c => {
        if (c.exists) {
            res.json({"Error" : false,"Result":c.data()})
        } else {
            res.json({"Error" : true,"Result":"No data"})
        }
        return
    })
   
});
exports.customerservice = functions.https.onRequest(app);
