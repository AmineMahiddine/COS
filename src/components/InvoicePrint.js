// // InvoicePrint.js
// import React from 'react';

// const InvoicePrint = ({ invoice, onPrint }) => {
//   return (
//     <div>
//       <h2>Print Invoice</h2>
//       <div>
//         <p>Facture No: {invoice.InvoiceID}</p>
//         <p>Date de facture: {invoice.InvoiceDate}</p>
//         <p>FOURNISSEUR</p>
//         <p>{invoice.SupplierName}</p>
//         <p>{invoice.SupplierAddress}</p>
//         <p>INFORMATION DE FOURNISSEUR</p>
//         <p>CLIENT</p>
//         <p>{invoice.ClientName}</p>
//         <p>{invoice.ClientAddress}</p>
//         <p>INFORMATION DE CLIENT</p>
//         <table>
//           <thead>
//             <tr>
//               <th>N°</th>
//               <th>LIBELLE</th>
//               <th>QUANTITÉ</th>
//               <th>PRIX</th>
//               <th>HT</th>
//               <th>TTC</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.InvoiceItems.map((item, index) => (
//               <tr key={item.ItemID}>
//                 <td>{index + 1}</td>
//                 <td>{item.ItemLibelle}</td>
//                 <td>{item.ItemQuantity}</td>
//                 <td>{item.ItemPrice}</td>
//                 <td>{(item.ItemPrice * item.ItemQuantity).toFixed(2)}</td>
//                 <td>{(item.ItemPrice * item.ItemQuantity * (1 + item.ItemTax / 100)).toFixed(2)}</td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan="4">TOTAL</td>
//               <td>{invoice.InvoiceItems.reduce((total, item) => total + (item.ItemPrice * item.ItemQuantity), 0).toFixed(2)}</td>
//               <td>{invoice.InvoiceItems.reduce((total, item) => total + (item.ItemPrice * item.ItemQuantity * (1 + item.ItemTax / 100)), 0).toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td colSpan="5">TVA</td>
//               <td>{(invoice.InvoiceItems.reduce((total, item) => total + (item.ItemPrice * item.ItemQuantity * item.ItemTax / 100), 0)).toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td colSpan="5">Total TTC</td>
//               <td>{(invoice.InvoiceItems.reduce((total, item) => total + (item.ItemPrice * item.ItemQuantity * (1 + item.ItemTax / 100)), 0)).toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//         <p>LA SIGNATURE</p>
//       </div>
//       <button onClick={onPrint}>Print</button>
//     </div>
//   );
// };

// export default InvoicePrint;
