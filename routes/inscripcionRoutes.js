const express=require('express');

const router=express.Router();
const inscripcionController=require('../controller/inscripcionController')

router.get('/',inscripcionController.consultarTodos);
router.get('/xCurso/:id',inscripcionController.consultarxCurso);
router.get('/xestudiante/:id',inscripcionController.consultarxEstudiante);
router.post('/',inscripcionController.inscribir);

module.exports=router;
