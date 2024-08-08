const express=require('express');

const router=express.Router();
const estudianteController=require('../controller/estudiantesController')
router.get('/',estudianteController.consultar);
router.post('/',estudianteController.insertar);
router.put('/',estudianteController.modificar);
router.delete('/',estudianteController.borrar)

router.route('/:id')
.put(estudianteController.modificar)
.delete(estudianteController.borrar)
.get(estudianteController.consultarUno)


module.exports=router;