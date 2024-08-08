const express=require('express');
const cors=require('cors');
const app=express();
const port=3000;
const estudianteRouter=require('./routes/estudiantesRoutes')
const profesorRouter=require('./routes/profesoresRoutes')
const cursoRouter=require('./routes/cursosRoutes')
const inscripcionRouter=require('./routes/inscripcionRoutes')
app.get('/', (req,res)=>{
    res.send(' App Universidad');
})

app.use(express.json());
app.use(cors());



app.use('/estudiantes',estudianteRouter);
app.use('/profesores',profesorRouter);
app.use('/cursos',cursoRouter);
app.use('/inscripciones',inscripcionRouter);


app.listen(port, ()=> {
   console.log(`Servidor activo en puerto ${port}`)
})


