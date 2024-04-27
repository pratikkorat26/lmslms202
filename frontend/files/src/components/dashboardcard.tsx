import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';


export default function DashboardCard({}) {
  return (
    <Card sx={{ maxWidth: 345 }} className='course-card'>
      <CardActionArea>
        <CardContent component={Link} to="/test">
          <Typography gutterBottom variant="h6" component="div">
            Course ID
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Course Name
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/test">
          View Content
        </Button>
      </CardActions>
    </Card>
  );
}