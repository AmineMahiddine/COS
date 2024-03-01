import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Container, // Add Container from MUI
  Typography, // Add Typography from MUI
  // Button // Add Button from MUI
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight, Margin, Print } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = () => onPageChange(page - 1);
  const handleNextButtonClick = () => onPageChange(page + 1);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function InvoiceList({ invoices }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    // Set default values when invoices change
    setPage(0);
  }, [invoices]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setPage(0); // Reset page when performing a new search
  };

  const handleRowClick = (invoice) => {
    setSelectedInvoice(prevInvoice => prevInvoice === invoice ? null : invoice);
  };

  // Function to calculate the amount including VAT for each invoice
  const calculateTotalAmountIncludingVAT = (invoice) => {
    let totalAmountIncludingVAT = 0;
    invoice.InvoiceItems.forEach((item) => {
      const amount = item.ItemQuantity * item.ItemPrice * (1 + item.ItemTax / 100);
      totalAmountIncludingVAT += amount;
    });
    return totalAmountIncludingVAT.toFixed(2);
  };

  // Function to format the date in the specified format
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const printFacture = (invoice) => {
    // Calculate total without TVA
    const totalWithoutTVA = invoice.InvoiceItems.reduce((acc, item) => acc + (item.ItemQuantity * item.ItemPrice), 0);
    
    // Calculate TVA
    const TVA = invoice.InvoiceItems.reduce((acc, item) => acc + (item.ItemQuantity * item.ItemPrice * (item.ItemTax / 100)), 0);
    
    // Calculate total TTC
    const totalTTC = totalWithoutTVA + TVA;


    // Prepare the facture content
    const itemsContent = invoice.InvoiceItems.map((item, index) => (
      `<tr >
        <td style=" border: 1px solid black; padding: 8px;">${index + 1}</td>
        <td style=" border: 1px solid black; padding: 8px;">${item.ItemLibelle}</td>
        <td style=" border: 1px solid black; padding: 8px;">${item.ItemQuantity}</td>
        <td style=" border: 1px solid black; padding: 8px;">${item.ItemPrice.toFixed(2)} $</td>
        <td style=" border: 1px solid black; padding: 8px;">${(item.ItemQuantity * item.ItemPrice).toFixed(2)} $</td>
        <td style="border: 1px solid black; padding: 8px;">
        ${(item.ItemQuantity *( item.ItemPrice + item.ItemPrice * (item.ItemTax / 100)).toFixed(2))} $
      </td>
      </tr>`
    )).join('\n');

    const factureContent = `
    <style>
@page { size: auto;  margin: 2mm; }
</style>
    
    <div style= "margin-left: 100px;margin-right: 100px;">
    <div style="  font-style: italic; font-size: 24px;font-weight: bold;text-align: center;">Facture No ${invoice.InvoiceID}</div>
    <div style="text-align: right;">Date de facture : ${formatDate(invoice.InvoiceDate)}</div>\n\n
    <table align="margin-top: 30px;center" style="border-collapse: collapse;  width: 100%;">
  <tr style="line-height: 8px;">
    <td style=" font-style: italic;border-bottom: 1px solid black;margin-bottom: 0;">FOURNISSEUR</td>
    <td style=" padding: 18px;">&nbsp;</td> <!-- Empty cell for spacing -->
    <td style=" font-style: italic;border-bottom: 1px solid black;">CLIENT</td>
  </tr>
  <tr style="line-height: 8px;">
    <td style="   padding: 12px 0 0 0;    text-align: left;">
    ${invoice.SupplierName}    
    </td>

    <td style=" padding: 12px 0 0 0;">&nbsp;</td> <!-- Empty cell for spacing -->
    <td style=" padding: 12px 0 0 0; text-align: left;">
    ${invoice.ClientName}
    </td>
  </tr>
  <tr>
  <td style="font-style: italic;  text-align: left;">
  INFORMATION DE FOURNISSEUR
  </td>

  <td style=" padding: 8px;">&nbsp;</td> <!-- Empty cell for spacing -->
<td style="font-style: italic;  text-align: left;">
  INFORMATION DE CLIENT
  </td>
</tr>
</table>
    <table align="center" style="overflow-x:auto; border-collapse: collapse; margin-top: 16px; width: 100%;">
      <thead>
        <tr style="background-color: #ffc15e;">
          <th style="border: 1px solid black; padding: 8px;">N°</th>
          <th style="border: 1px solid black; padding: 8px;">LIBELLE</th>
          <th style="border: 1px solid black; padding: 8px;">QUANTITÉ</th>
          <th style="border: 1px solid black; padding: 8px;">PRIX</th>
          <th style="border: 1px solid black; padding: 8px;">HT</th>
          <th style="border: 1px solid black; padding: 8px;">TTC</th>
        </tr>
      </thead>
      <tbody style="text-align: center;">
        ${itemsContent}
      </tbody>
    </table>
    <table align="right" style="border-collapse: collapse; margin-top: 16px;">
      <tbody>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">TOTAL sans TVA:</td>
          <td style="border: 1px solid black; padding: 8px;">${totalWithoutTVA.toFixed(2)} $</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">TVA:</td >
          <td style="border: 1px solid black; padding: 8px;">${TVA.toFixed(2)} $ </td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Total TTC:</td>
          <td style="border: 1px solid black; padding: 8px;">${totalTTC.toFixed(2)} $</td>
        </tr>
      </tbody>
    </table>\n\n\n\n\n\n\n\n\n\n
    <div style="text-align: right;">LA SIGNATURE</div>
    </div>` ;

    // Open a new window and print the facture content
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<pre>${factureContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  // Filtering invoices based on the search query for client name or item labels
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.ClientName.toLowerCase().includes(searchQuery) ||
    invoice.InvoiceItems.some((item) => item.ItemLibelle.toLowerCase().includes(searchQuery))
  );

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filteredInvoices.length - page * rowsPerPage);

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px', marginBottom: '50px'}}>
     <h1  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Invoice Management System</h1>
      <Stack spacing={3}>
        <Paper sx={{ padding: 2, boxShadow: 3 }}>
          <Stack spacing={1} direction="row" marginBottom={2}>
            <TextField
              id="outlined-basic"
              placeholder="Search By Client Name or Item Libelle ..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ marginRight: "8px" }} />,
              }}
            />
          </Stack>
        </Paper>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            {/* Table Head */}
            <TableHead style={{ backgroundColor: "#F9F9F9" }}>
              <TableRow>
                <TableCell align="center">Facture ID</TableCell>
                <TableCell align="center">Facture Date</TableCell>
                <TableCell align="center">Client Nom</TableCell>
                <TableCell align="center">Fournisseur Nom</TableCell>
                <TableCell align="center">Montant TTC</TableCell>
                <TableCell align="center">Imprimer Facture</TableCell> {/* New column for Print Facture */}
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {(rowsPerPage > 0
                ? filteredInvoices.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredInvoices
              ).map((invoice) => (
                <React.Fragment key={invoice.InvoiceID}>
                  <TableRow
                    hover // Enable hover effect
                    onClick={() => handleRowClick(invoice)}
                    sx={{ '&:hover': { backgroundColor: '#F9F9F9' }, cursor: 'pointer' }} // Apply background color on hover and change cursor to pointer
                    >
                    <TableCell align="center">{invoice.InvoiceID}</TableCell>
                    <TableCell align="center">{invoice.InvoiceDate}</TableCell>
                    <TableCell align="center">{invoice.ClientName}</TableCell>
                    <TableCell align="center">{invoice.SupplierName}</TableCell>
                    <TableCell align="center">{calculateTotalAmountIncludingVAT(invoice)}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => printFacture(invoice)}> {/* Print button */}
                        <Print />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {selectedInvoice === invoice && (
                    <TableRow>
                      <TableCell colSpan={6} >
                        {/* Details content */}
                        <Box mt={2} ml={2} p={2} backgroundColor="#F9F9F9">
                          <Typography variant="h6">Invoice Items:</Typography>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Item Libelle</TableCell>
                                <TableCell>Unité d’Item</TableCell>
                                <TableCell>Quantité d’item</TableCell>
                                <TableCell>Prix d’item</TableCell>
                                <TableCell>Taxe d’item</TableCell>
                                <TableCell>Montant d’item TTC</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {invoice.InvoiceItems.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.ItemLibelle}</TableCell>
                                  <TableCell>{item.ItemUnit}</TableCell>
                                  <TableCell>{item.ItemQuantity}</TableCell>
                                  <TableCell>{item.ItemPrice}</TableCell>
                                  <TableCell>{item.ItemTax}</TableCell>
                                  <TableCell>{(item.ItemQuantity * item.ItemPrice * (1 + item.ItemTax / 100)).toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={6}
          count={filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          sx={{ border: "none" }}
        />
      </Stack>
    </Container>
  );
}

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default InvoiceList;
