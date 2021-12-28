import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";


const Mural = () =>{

    const [message, setmessage] = useState([]);

    useEffect(async () =>{
        const response = await fetch('http://localhost:5000/message')
        const data = await response.json();
        console.log(data)
    })

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" fullWidth />
                <TextField id="message" label="Message" fullWidth />
            </Grid>
            <Button className="mt-2" variant="contained" color="primary">
                Sent
            </Button>
            <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title">Author</h5>
                    <h5 className="card-text">Message content</h5>
                    <h5 className="card-text"><small className="text-muted">Message date</small></h5>
                </div>
            </div>
        </>
    )
}

export default Mural;