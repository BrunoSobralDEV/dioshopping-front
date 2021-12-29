import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";


const Mural = () =>{

    //listar as mensagens do banco - map() em seguida
    const [message, setMessage] = useState([]);

    //armazenados dados do input passado pelo usuário
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    useEffect(async () =>{
        const response = await fetch('http://localhost:5000/message')
        const data = await response.json();
        setMessage(data);
        //passar [] vazio, senão fica em loop
    }, [])

    const sendMessage = () =>{
        console.log(author, content)
    }

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth />
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth />
            </Grid>
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