import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, selectData, setCode } from "../slices/dataSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface DataRow {
  _id: string;
  created_at: string;
  rate: number;
  volume: number;
  cap: number;
}

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, code } = useSelector(selectData);

  useEffect(() => {
    dispatch(fetchData(code));
    const interval = setInterval(() => {
      dispatch(fetchData(code));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, code]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCode(event.target.value));
  };
  const handleSubmit = () => {
    dispatch(fetchData(code));
    handleClose();
  };

  const COIN_TO_CODE_MAP: Record<string, string> = {
    BTC: "Bitcoin",
    ETH: "Ethereum",
    USDT: "Tether",
    SOL: "Solana",
    USDC: "USD COIN",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ textAlign: "center" }}>
          Showing Data for {COIN_TO_CODE_MAP[code]}
        </h3>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ alignSelf: "auto" }}
        >
          Change Stock/Crypto
        </Button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            select
            label="Stock/Crypto"
            variant="outlined"
            fullWidth
            value={code}
            onChange={handleChange}
          >
            {Object.entries(COIN_TO_CODE_MAP).map(([code, coin]) => (
              <MenuItem key={code} value={code}>
                {coin}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Time (Local Time)</TableCell>
              <TableCell align="center">Rate (USD)</TableCell>
              <TableCell align="center">Volume (USD)</TableCell>
              <TableCell align="center">Market Cap (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: DataRow) => (
              <TableRow key={row._id}>
                <TableCell align="center">
                  {new Date(row.created_at).toLocaleString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell align="center">{row.rate}</TableCell>
                <TableCell align="center">{row.volume}</TableCell>
                <TableCell align="center">{row.cap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
