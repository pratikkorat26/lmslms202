// @ts-ignore

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

interface DashboardCardProps {
  courseid: string;
  coursename: string;
  coursedescription: string;
  coursesemester: string;
  buttondisabled: boolean;
}

export default function DashboardCard({courseid, coursename, coursedescription, coursesemester, buttondisabled}: DashboardCardProps) {
  const navigate = useNavigate();
  const url = `/course?courseid=${encodeURIComponent(courseid)}&coursename=${encodeURIComponent(coursename)}&coursedescription=${encodeURIComponent(coursedescription)}`;
  // const url = `/course/${courseid}/${coursedescription}`;

  return (
    <Card sx={{ maxWidth: 345 }} className='course-card'>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
              {courseid}
          </Typography>
          <Typography variant="body1" color="text.secondary">
              {coursename}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {coursedescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {coursesemester}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={url} disabled={buttondisabled}>
          View Content
        </Button>
      </CardActions>
    </Card>
  );
}
