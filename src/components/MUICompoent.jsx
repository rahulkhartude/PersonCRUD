


import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicTable from './ShowList';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Checkbox from '@mui/material/Checkbox';
export const MUICompoent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });
  const [isDuplicate, setDuplicate] = useState(false);
  const [gender ,setGender] = useState("female");
  const [role, setRole] = useState('');
  const [selectedCourses, setSelectedCourses] = useState({
    react: true,
    javascript: false,
    typescript: false,
  });
  const [myAddress,setMyAddress] = useState("");
  const handleAddress=(value)=>{
    setMyAddress(value);
  }

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleSave = () => {
    let valid = true;
    const newErrors = { firstName: '', lastName: '' };
    setDuplicate(false); // reset duplicate flag

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    const alreadyExists = list.some(
      (item) =>
        item.firstName.toLowerCase() === firstName.toLowerCase() &&
        item.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (alreadyExists) {
      setDuplicate(true);
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setList([...list, { firstName, lastName ,gender,role,selectedCourses,myAddress }]);
      console.log("list",list);
      setFirstName('');
      setLastName('');
      setGender('female');
      setRole('');
      setSelectedCourses({ react: true, javascript: false, typescript: false });
      setMyAddress('');
    }
  };
  const handleGender =(value)=>{
    setGender(value)
  }

  const handleCourse=(e)=>{
    setSelectedCourses({...selectedCourses,[e.target.name] :e.target.checked})

  }

  return (
    <>
      <Box
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        autoComplete="off"
      >
        <TextField
          label="First Name"
          variant="standard"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />

        <TextField
          label="Last Name"
          variant="standard"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />

      </Box>
      <Box sx={{ marginTop: 2, padding: 2, borderRadius: 1 ,fontSize: '0.9rem'}}>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ fontWeight: 'bold',  marginBottom: 1 }}
        >
          Gender
        </FormLabel>
        <RadioGroup
          value={gender}
          onChange={(e) => handleGender(e.target.value)}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue= {gender}
          sx={{
            justifyContent: 'space-around', // space out radios
            backgroundColor: '#fff',
            padding: 1,
            borderRadius: 1,
          }}
        >
          <FormControlLabel
            value="female"
            control={<Radio color="secondary" />}
            label="Female"
            // sx={{ color: 'secondary.main' }}
            // onChange={()=>handleGender(value)}
          />
          <FormControlLabel
            value="male"
            control={<Radio color="secondary" />}
            label="Male"
            // sx={{ color: 'secondary.main' }}
          />
          <FormControlLabel
            value="other"
            control={<Radio color="secondary" />}
            label="Other"
            // sx={{ color: 'secondary.main' }}
          />
        </RadioGroup>
      </FormControl>
    </Box>

     <Box>
     <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={role}
          onChange={handleRole}
          autoWidth
          label="role"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="developer">Developer</MenuItem>
          <MenuItem value="tester">Tester</MenuItem>
          <MenuItem value="Support">Support</MenuItem>
        </Select>
      </FormControl>
     </Box>

  <Box>
     <FormControl component="fieldset" sx={{ margin: 2 }}>
      <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Courses
      </FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox  checked= {selectedCourses.react} onChange={(e)=>handleCourse(e)} name="react"  />}  label="React" />
        <FormControlLabel required control={<Checkbox  checked = {selectedCourses.javascript} onChange={(e)=>handleCourse(e)} name="javascript" />}  label="JavaScript" />
        <FormControlLabel  control={<Checkbox  checked = {selectedCourses.typescript} onChange={(e)=>handleCourse(e)} name='typescript'/>} label="TypeScript" />
      </FormGroup>
    </FormControl>
    </Box>
<Box>
  
    <TextareaAutosize
  aria-label="minimum height"
  minRows={3}
  placeholder="Minimum 3 rows"
  style={{ width: 200 }}
  onChange={(e)=>handleAddress(e.target.value)}
  value={myAddress}
/>
</Box>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>

      {isDuplicate && (
        <p style={{ color: 'red' }}>This name already exists!</p>
      )}

      {list.length > 0 && <BasicTable myList={list} />}
    </>
  );
};
