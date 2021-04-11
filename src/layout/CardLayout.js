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
import { useHistory } from 'react-router';

const paperwidth = 500;

const useStyles = makeStyles({
    settingIcons: {
        marginLeft: 'auto',
    },
    root: {
        maxWidth: paperwidth,
    },
})

function CardLayout({ data, handleDelete }) {
    const classes = useStyles()
    const history = useHistory()

    return (
        <Card elevation={2} className={classes.root}>
            <CardHeader title={data.title} />
            <CardContent>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Chairperson : {data.chairperson}
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
                <IconButton aria-label="edit" className={classes.settingIcons} onClick={() => {
                    history.push(`/project/${data.id}/edit`)
                }}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => {
                    console.log('A')
                    handleDelete(data.id)
                }}>
                    <DeleteIcon />
                </IconButton>
            </CardActions >
        </Card >
    )
}

export default CardLayout

