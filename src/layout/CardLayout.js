import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from '@material-ui/core/CardActions';



const useStyles = makeStyles({
    settingIcons: {
        marginLeft: 'auto',
    }
})

function CardLayout({ data }) {
    const classes = useStyles()
    return (
        <Card elevation={2}>
            <CardHeader title={data.title} />
            <CardContent>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Chairperson : {data.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Contractor: {data.contractor}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Local Contribution: {data.contribution}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Status: {data.status}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Estimated Budget: Rs. {data.eb}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Government Budget: Rs. {data.gb}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Starting Date: {data.sd}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    End Date: {data.ed}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Description: {data.description}
                </Typography>
            </CardContent>
            < CardActions disableSpacing >
                <IconButton aria-label="edit" className={classes.settingIcons}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions >
        </Card >
    )
}

export default CardLayout

