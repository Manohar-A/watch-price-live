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

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Change Stock/Crypto
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            label="Stock/Crypto Code"
            variant="outlined"
            fullWidth
            value={code}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: DataRow) => (
              <TableRow key={row._id}>
                <TableCell>
                  {new Date(row.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{row.rate}</TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>{row.cap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
