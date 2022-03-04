import PropTypes from "prop-types";
// material
import { TableRow, TableCell, TableHead } from "@mui/material";

// ----------------------------------------------------------------------

LoansListHead.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
};

export default function LoansListHead({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
