const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

/* //middleware 1
app.use(function(request,response,next){
    request.Myname="kuldeep";
    //console.log('misddleware 1 called');
    next();
});

//middleware 2
app.use(function(request,response,next){
    console.log('My Name from MW2',request.Myname);
    //console.log('misddleware 2 called');
    next();
}); */


var contactList=[
    {
        name:"Kuldeep",
        phone:"1111111111"
    },
    {
        name:"Tony Stark",
        phone:"1234567890"
    },
    {
        name:"Coding Ninjas",
        phone:"231637634"
    }
]

app.get('/',function(request,response){
    // console.log(__dirname);
    // console.log(request);
    // response.send('<h1>Cool ,it is running! or is it?</h1>');
    //return response.render('home');

    //console.log('from the get route controller',request.Myname);
    
    
        Contact.find({},function(err,contacts){
            if(err){
                console.log('Error in fetching contacts from db');
                return;
            }
            return response.render('home',{
                title:"Contact List",
                contact_list: contacts
            });
    });

    // return response.render('home',{
    //     title:"I am flying",
    //     contact_list: contactList
    // });
});
app.get('/practice',function(request,response){
    return response.render('practice',{title:"Let us play with ejs"});
});

app.post('/create-contact',function(request,response){
    // contactList.push({
    //     name:request.body.name,
    //     phone:request.body.phone
    // })
    // return response.redirect('/');

      // contactList.push(request.body);
      // return response.redirect('back');

    // console.log(request.body);
    // console.log(request.body.name);
    // console.log(request.body.phone);

    // console.log(request);
    // return response.redirect('/practice');
    Contact.create({
        name:request.body.name,
        phone:request.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*******',newContact);
        return response.redirect('back');
    })
});

// for deleting a contact
/* app.get('/delete-contact/',function(request,response){
    // console.log(request.params);
    // let phone=request.params.phone;

    console.log(request.query);

    //get the query from the url
    let phone=request.query.phone;
    let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1)
    }
    return response.redirect('back');
    
}); */

app.get('/delete-contact/',function(request,response){
    //get the id from query in the url
    let id=request.query.id;
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
    if(err){
        consol.log('error in deleting an object from database');
        return;
    }
    return response.redirect('back');
  }); 
    
});


app.listen(port,function(err){
    if(err){
    console.log('Error in running the server',err);
    }
    console.log('Yup!My Express server is running on port',port);
});

