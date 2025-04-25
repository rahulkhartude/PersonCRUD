

// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

// export default function BasicTable({ myList }) {
//   const columns = [
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     { field: 'gender', headerName: 'Gender', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//     { field: 'courses', headerName: 'Courses', width: 200 },
//     { field: 'myAddress', headerName: 'Address', width: 200 },
//   ];

//   const rows = myList.map((row, index) => ({
//     id: index + 1, // ✅ Required
//     firstName: row.firstName,
//     lastName: row.lastName,
//     gender: row.gender,
//     role: row.role,
//     courses: row.selectedCourses
//       ? Object.entries(row.selectedCourses)
//           .filter(([_, value]) => value)
//           .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
//           .join(', ')
//       : 'No courses',
//       myAddress: row.myAddress
//   }));

//   const paginationModel = { page: 0, pageSize: 5 };

//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// }


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function BasicTable({ myList }) {
  const columns = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'courses', headerName: 'Courses', width: 200 },
    // { field: 'myAddress', headerName: 'Address', width: 200 },
    {
      field: 'myAddress',
      headerName: 'Address',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value || ''} arrow>
          <Typography
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            {params.value || 'N/A'}
          </Typography>
        </Tooltip>
      ),
    },
  ];

  const rows = myList.map((row, index) => ({
    id: index + 1, // ✅ Required by DataGrid
    firstName: row.firstName,
    lastName: row.lastName,
    gender: row.gender,
    role: row.role,
    courses: row.selectedCourses
      ? Object.entries(row.selectedCourses)
          .filter(([_, value]) => value)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
          .join(', ')
      : 'No courses',
    myAddress: row.myAddress || 'N/A', // Fallback if missing
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5,10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
