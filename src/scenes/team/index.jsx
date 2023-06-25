import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
// import axios from 'axios';
import React, {useEffect, useState} from "react";

// import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
// import { Container } from 'react-bootstrap';
// import { Form } from 'react-bootstrap';
// import { InputGroup } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// import { Table,TableContainer, TableHead, TableRow, TableBody, TableCell } from '@mui/material';

const Team = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [teamData,setTeamData] = useState([])

  useEffect(() => {
    getListTeam()
  },[])
  
  const getListTeam = () => {
    fetch ("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user",{
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((res) => {
            console.log(res);
            if (res) {
              setTeamData(res.teamData)
            }
          })
          .catch((err) => {
           console.log(err);
          });
  }

 
  const columns = [
    { field:"id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
          
        );
      }, 
    },
// //     <TableContainer>
// //   <Table>
// //     <TableHead>
// //       <TableRow>
// //         {teamData.map((column) => (
// //           <TableCell key={column.field}>{column.headerName}</TableCell>
// //         ))}
// //       </TableRow>
// //     </TableHead>
// //     <TableBody>
// //       {teamData.map((row) => (
// //         <TableRow key={row.id}>
// //           <TableCell>{row.id}</TableCell>
// //           <TableCell>{row.name}</TableCell>
// //           <TableCell>{row.email}</TableCell>
// //           <TableCell>{row.accessLevel}</TableCell>
// //         </TableRow>
// //       ))}
// //     </TableBody>
// //   </Table>
// // </TableContainer>
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );


  // Code của ĐĂNG

//   const [search, setSearch] = useState('');
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(
//             "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
//           );
//           setEvents(response.data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
  
//       fetchData();
//     }, []);

//   return (
//       <div className='SearchList'>
//           <Container>
//               <h1 className='text-center mt-4'>Event List</h1>
//               <Form>
//                   <InputGroup className='my-3'>
//                       <Form.Control
//                       onChange={(e) => setSearch(e.target.value)} 
//                       placeholder='Search Event'
//                       />
//                   </InputGroup>
//               </Form>
//               <Table>
//                   <thread>
//                       <tr>
//                           <th>Event Name</th>
//                           <th>Location</th>
//                           <th>Description</th>
//                           <th>Timeline</th>
//                       </tr>
//                   </thread>
//                   <tbody>
//                       {events
//                           .filter((event) => {
//                               return search.toLowerCase() === ''
//                               ? event
//                               : event.eventName.toLowerCase().includes(search);
//                       })
//                       .map((event) => (
//                           <tr key={event.eventID}>
//                               <td>{event.eventName}</td>
//                               <td>{event.location}</td>
//                               <td>{event.description}</td>
//                               <td>{event.timeline}</td>
//                           </tr>
//                       ))}
                      
//                   </tbody>
//               </Table>
//           </Container>
//       </div>
//   );
 };

export default Team;
