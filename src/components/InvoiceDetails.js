// // InvoiceDetails.js
// import React from 'react';
// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const InvoiceDetails = ({ invoice }) => {
//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>
//         Invoice Details
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Item Label</TableCell>
//               <TableCell>Item Unit</TableCell>
//               <TableCell>Item Quantity</TableCell>
//               <TableCell>Item Price</TableCell>
//               <TableCell>Tax item</TableCell>
//               <TableCell>Amount of item including VAT</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {invoice.InvoiceItems.map((item) => (
//               <TableRow key={item.ItemID}>
//                 <TableCell>{item.ItemLibelle}</TableCell>
//                 <TableCell>{item.ItemUnit}</TableCell>
//                 <TableCell>{item.ItemQuantity}</TableCell>
//                 <TableCell>{item.ItemPrice}</TableCell>
//                 <TableCell>{item.ItemTax}</TableCell>
//                 <TableCell>{((item.ItemPrice * item.ItemQuantity * (1 + item.ItemTax / 100))).toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default InvoiceDetails;
