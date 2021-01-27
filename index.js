const express = require('express');
const mongoose = require('mongoose');
const ModelImagen = require('./model_imagen');
const fileUpload = require('express-fileupload');
const path = require('path');


const app = express();
app.use(fileUpload({
	limits: {fileSize: 50 * 1024 * 1024},
}));




app.get('/', (req,res) => {
	res.json({
		texto: 'Hola Mundo'
	});
});


app.get('/imagen/:id',(req,res) => {
	let id = req.params.id;

	ModelImagen.findById(id).exec((err, rpta) => {
		if(err){
			res.json({
				err: err
			});
		}

		res.set('Content-Type',rpta.imagen.contentType);
		return res.send(rpta.imagen.data);
	
})

	console.log(id);
/*
	res.json({
		id: id
	
	});
	*/
});


app.post('/uploadmongo', (req,res) => {


//	let param = req.params.nodevariable;  // url
//	let body = req.body.variable;	      // body
	let imagen = req.files.variable;     // imagen

	console.log(imagen);




	let data = {
		producto_nombre: 'Prueba Nombre'

	}

	let modelImagen = new ModelImagen(data);


	modelImagen.imagen.data = req.files.variable.data;
	modelImagen.imagen.contentType = req.files.variable.mimetype;



	modelImagen.save((err, rpta) => {
		if(err){
			res.json({
				err: err
			});
		}

		res.json({
			result: true
			 
		
		});

	});
	
});



mongoose.connect('mongodb+srv://gusun0:linux@test-cluster1.h89rf.mongodb.net/img?retryWrites=true&w=majority',{
 	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	console.log('Mongo Ok!');
})




app.listen(3000, () => {

	console.log('Server express port 3000');

});
