import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";


const Mural = () =>{

    const url = 'http://localhost:5000/message';
    //listar as mensagens do banco - map() em seguida
    const [message, setMessage] = useState([]);

    //armazenados dados do input passado pelo usuário
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    //alert's
    const [validator, setValidator] = useState(false);
    const [success, setSuccess] = useState(false);

    //renderizar a página, após inserção
    const [render, setRender] = useState(false);

    useEffect(async () =>{
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);
        //Quando render for verdadeiro, irá consultar novamente a API
    }, [render])

    const sendMessage = () =>{
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        }
        //Transformar em String p/ passar p/ o Payload
        const bodyForm = {
            email: author,
            message: content
        }
        //Envio dos dados p/ Back-end
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        //Retornar a resposta em json
        .then((response) => response.json())
        //pega os dados e me devolve
        .then((data) =>{
            if(data.id){
                setRender(true);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            }
        })
        
        //limpar campos
        setAuthor('');
        setContent('');

        console.log(content)
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
            {success &&
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem enviada!</strong>
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