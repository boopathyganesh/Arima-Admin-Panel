import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { Typography } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from "../../../redux/store";
import { getAllOrders } from "../../../redux/slices/orders/orderSlice";
import { useNavigate } from 'react-router-dom';

const OrdersTable = () => {
  const classes = useStyles();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [ordersData, setOrders] = useState([]);

  const { orders } = useSelector((state) => state.order);


  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);


  useEffect(() => {
    if (orders || orders.length) {
      setOrders(orders);
    };
  }, [orders]);


  return (
    <>
      <section className={classes.root}>
        <section className={classes.headerWrapper}>
          <div className={classes.headerLabel}>
            <Typography variant="h6">All Orders</Typography>
          </div>
          <div className={classes.headerLink}>
            <Typography onClick={()=>{navigate("/allorders")}} variant="body2">View all</Typography>
          </div>
        </section>
        <div className={classes.tableContainer}>
          {/* <table className={classes.table}>
            <thead>
              <tr className={classes.tableHead}>
                <th
                  className={classes.tableCell}
                  style={{ borderTopLeftRadius: 5, width: 80, maxWidth: 80 }}
                >
                  S.no
                </th>
                <th className={classes.tableCell}>Order ID</th>
                <th className={classes.tableCell}>Customer Name</th>
                <th className={classes.tableCell}>Mobile No</th>
                <th className={classes.tableCell}>Shop</th>
                <th
                  className={classes.tableCell}
                  style={{ borderTopRightRadius: 5 }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className={classes.tbody}>
              <tr>
                <td className={classes.tableCell}>1</td>
                <td className={classes.tableCell}>ORD123WQ13</td>
                <td className={classes.tableCell}>Wayne</td>
                <td className={classes.tableCell}>8889998887</td>
                <td className={classes.tableCell}>Street Arabiya</td>
                <td className={classes.tableCell}>Packing</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>2</td>
                <td className={classes.tableCell}>ORD123WQ13</td>
                <td className={classes.tableCell}>Frances</td>
                <td className={classes.tableCell}>8889908887</td>
                <td className={classes.tableCell}>SS Hydrabad Biryani</td>
                <td className={classes.tableCell}>Packing</td>
              </tr>
            </tbody>
          </table> */}
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell style={{ borderTopLeftRadius: 5 }}>
                    <Typography variant="body2"> S.no</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Order Id</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Customer Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Mobile No</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Shop</Typography>
                  </TableCell>
                  <TableCell style={{ borderTopRightRadius: 5 }}>
                    <Typography variant="body2">Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {ordersData && ordersData.map((data, i) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body2">{i + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{data?.orderID}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{data?.createdAt}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{data?.user?.userName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{data?.user?.phone_number}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{data?.vendor?.shop_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <div className={classes.lightGreenStatus}>
                        <Typography variant="body2">{data?.orderStatus}</Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}



                {/* <TableCell>
                    <Typography variant="body2">7773337771</Typography>
                  </TableCell>{' '} */}
                {/* <TableCell>
                    <Typography variant="body2">Street Arabiya</Typography>
                  </TableCell>
                  <TableCell>
                    <div className={classes.lightGreenStatus}>
                      <Typography variant="body2">Packing</Typography>
                    </div>
                  </TableCell> */}

                {/* <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2">2</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">ORD123WQ37</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">01.01.2023</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Frances Ha</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">7773337771</Typography>
                  </TableCell>{' '}
                  <TableCell>
                    <Typography variant="body2">
                      SS Hyderabad Biryani
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div className={classes.lightGreenStatus}>
                      <Typography variant="body2">Packing</Typography>
                    </div>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  )
}

export default OrdersTable
