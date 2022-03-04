import { useSelector } from "react-redux";
import { useState } from "react";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import LoansNotFound from "../components/LoansNotFound";
import { LoansListHead } from "../sections/@dashboard/loans";
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "loanAmt", label: "Loan Amount", alignRight: false },
  { id: "startDate", label: "Start Date", alignRight: false },
  { id: "endDate", label: "End Date", alignRight: false },
  { id: "fixedInterest", label: "Fixed Interest Rate", alignRight: false },
];

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loans } = useSelector((state) => state.loans);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loans.length) : 0;

  const ifLoansNotFound = loans.length === 0;
  return (
    <Page title="Dashboard">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Hi, Welcome to MY BANK!
          </Typography>
        </Stack>
        <Typography variant="h5" gutterBottom>
          My Loans
        </Typography>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, pl: 3 }}>
              <Table>
                <LoansListHead headLabel={TABLE_HEAD} rowCount={loans.length} />
                <TableBody>
                  {loans
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        loanAmount,
                        startDate,
                        endDate,
                        fixedInterest,
                      } = row;
                      const name = firstName + " " + lastName;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{loanAmount}</TableCell>
                          <TableCell align="left">{startDate}</TableCell>
                          <TableCell align="left">{endDate}</TableCell>
                          <TableCell align="left">
                            {fixedInterest ? "YES" : "NO"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {ifLoansNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <LoansNotFound />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={loans.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
