import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {Link} from 'react-router-dom';

interface Courses {
    Coursename: string;
    Faculty: string;
    Coursesemester: string;
}

// @ts-ignore
export default function DashboardCardAdmin({coursename, coursesemester, facultyname}: DashboardCardProps) {
    return (
        <Card sx={{maxWidth: 345}} className='course-card'>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {coursename}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {coursesemester}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {facultyname}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}