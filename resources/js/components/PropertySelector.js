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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function PropertySelector(props) {
  const properties = props.properties;
  let errors;
  let currentProperty;

  if (props.errors){
  errors = props.errors}
  if(props.job){
    const currentJob = props.job;
    for (let i = 0; i < properties.length; i++)  {  
      if (properties[i].id === currentJob.property){
       currentProperty = properties[i]
      }        
      
  }
}

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [property, setPoperty] = React.useState('');

  const handleChange = (event) => {
    setPoperty(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
      handleClose();
    
      props.onSubmit('property', property);

  };

  const mystyle = {
    margin: "0 0 1rem -0.3rem",
  };


  return (

    
    <div>        
    <Button style={mystyle} onClick={handleClickOpen}>Property</Button>
    <span style={{color: "red"}}>{(errors) ? errors["property"]: ''}</span>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{(currentProperty ? "Current Property:" + " " + currentProperty.name : "Pick a property")}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>
              <Select
                native
                value={property}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {properties ? properties.map((property)  =>(              
                    <option key={property.id} value={property.id}>{property.name}</option>)) : ''
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