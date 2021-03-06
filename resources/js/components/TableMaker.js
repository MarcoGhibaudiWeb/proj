import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UpdateJobForm from './UpdateJobForm';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
    maxHeight: 600,
    margin : "3rem 0"
  },
  paper: {
    padding: "0 1rem",
    backgroundColor: "#f7f7f5" ,
  },
});


function Row(props) {
  const { row } = props;
  const  properties  = props.properties;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  let property = '';

  properties.map(data => {
    if(data.id === row.property){
      property = data;
    }})
  return (
    <React.Fragment >
      <TableRow className={classes.root} >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : "Edit"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.summary}
        </TableCell>
        <TableCell >{row.description}</TableCell>
        <TableCell >{property.name}</TableCell>
        <TableCell >{row.status}</TableCell>
        <TableCell >{row.fname}&nbsp;{row.lname}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 1 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <UpdateJobForm currentJob={row} properties = {properties} onUpdate = {props.onUpdate} onDelete = {props.onDelete} response = {props.response}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TableMaker = ({ onUpdate, onDelete, jobs, properties, response }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <TableContainer  className={classes.container}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Summary</TableCell>
            <TableCell>Description</TableCell>
            <TableCell >Property</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Added by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((row) => (
            <Row key={row.id} row={row} onUpdate = {onUpdate} onDelete = {onDelete} properties = {properties} response = {response}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}

export default TableMaker;