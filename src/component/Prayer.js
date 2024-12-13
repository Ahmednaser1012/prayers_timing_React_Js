import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

import Container from "@mui/material/Container";
import "./prayer.css";

export default function MediaCard({ name, time, image }) {
  return (
    // <Card sx={{ width: "14vw" }}>
    //   <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
    //   <CardContent>
    //     <h2>{name}</h2>

    //     <Typography variant="h2" color="text.secondary">
    //       {time}
    //     </Typography>
    //   </CardContent>
    // </Card>

    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
    //   <CardContent>
    //     <Typography gutterBottom variant="h4" component="div">
    //       {name}
    //     </Typography>
    //     <Typography variant="body2" sx={{ color: "text.secondary" }}>
    //       {time}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Share</Button>
    //     <Button size="small">More</Button>
    //   </CardActions>
    // </Card>

    <Container>
      <div className="row ">
        <div className="col ">
          <div className="card h-100 prayer">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body ">
              <h5 className="card-title"> {name}</h5>
              <p className="card-text" style={{ color: "text.secondary" }}>
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
