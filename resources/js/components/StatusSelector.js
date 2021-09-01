import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TableCell from '@material-ui/core/TableCell';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
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
    <Button onClick={handleClickOpen}>Status</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Current st atus: <br></br>{props.job.status}</DialogTitle>
        <DialogContent>
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