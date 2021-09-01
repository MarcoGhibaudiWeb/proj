import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '30rem',

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '20rem',
  },
  button:{
    margin: "0 0 1rem -0.3rem",
  }
}));

export default function StatusSelector(props) {
  const statusList = ['open', 'in progress', 'completed', 'cancelled']
  const classes = useStyles();
  const currentJob = props.job;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
      handleClose();
    
      props.onSubmit('status', status);

  };



  return (
    <div>        
    <Button  className={classes.button} onClick={handleClickOpen}>Status</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Current status: <br></br>{props.job.status}</DialogTitle>
        <DialogContent >
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {statusList.map((status)  =>(              
                    <option key={status} value={status}>{status}</option>))
                }
                
              </Select>
            </FormControl>
           
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}