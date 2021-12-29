import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";


const Mural = () =>{

    //listar as mensagens do banco - map() em seguida
    const [message, setMessage] = useState([]);

    //armazenados dados do input passado pelo usuário
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    //alert de erro
    const [validator, setValidator] = useState(false);

    useEffect(async () =>{
        const response = await fetch('http://localhost:5000/message')
        const data = await response.json();
        setMessage(data);
        //passar [] vazio, senão fica em loop
    }, [])

    const sendMessage = () =>{
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        }
    }

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth />
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth />
            </Grid>

            {validator &&
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Sent
            </Button>
            {message.map((content) =>{
                return(
                    <div className="card mt-2" key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <h5 className="card-text">{content.message}</h5>
                            <h5 className="card-text"><small className="text-muted">{content.created_at}</small></h5>
                        </div>
                    </div>
                )
            } )}
        </>
    )
}

export default Mural;