const express=require('express');

const router=express.Router();
const profesorController=require('../controller/profesoresController')
router.get('/',profesorController.consultar);
router.post('/',profesorController.insertar);
router.put('/',profesorController.modificar);
router.delete('/',profesorController.borrar)

router.route('/:id')
.put(profesorController.modificar)
.delete(profesorController.borrar)
.get(profesorController.consultarUno)

router.get('/', (req,res)=>{
    res.send('Consultando profesor');
});

router.post('/', (req,res)=>{
    res.send('Agregando profesor');
});


router.put('/', (req,res)=>{
    res.send('Modificando profesor');
});


router.delete('/', (req,res)=>{
    res.send('Borrando profesor');
});


module.exports=router;