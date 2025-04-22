import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({myList}) {
  console.log("child",myList);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,marginTop: 5 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx = {{fontWeight:"bold", backgroundColor:'grey'}}>First Name</TableCell>
            <TableCell sx = {{fontWeight:"bold", backgroundColor:'grey'}} >Last Name</TableCell>
            <TableCell sx = {{fontWeight:"bold", backgroundColor:'grey'}} >Gender</TableCell>
            <TableCell sx = {{fontWeight:"bold", backgroundColor:'grey'}} >ROle</TableCell>
            <TableCell sx = {{fontWeight:"bold", backgroundColor:'grey'}} >Courses</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody >
          {myList.map((row,index) => (
            <TableRow
               key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.firstName}</TableCell>
              <TableCell >{row.lastName}</TableCell>
              <TableCell >{row.gender}</TableCell>
              <TableCell >{row.role}</TableCell>

              <TableCell>
  {row.selectedCourses
    ? Object.entries(row.selectedCourses)
        .filter(([_, value]) => value)
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(', ')
    : 'No courses'}
</TableCell>

              
            </TableRow>
          ))}
          
        </TableBody>
   
      </Table>
    </TableContainer>


  );

}