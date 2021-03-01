/* eslint-disable react/no-array-index-key */
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export default function BasicTable({
  titles,
  rows,
  postMentoree,
  dismissNotification,
}) {
  console.log("rows en Table", rows);
  return (
    <div>
      {rows.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {titles === "no titles" ? null : (
              <TableHead>
                <TableRow>
                  {titles.map((e) => {
                    return <TableCell key={e}>{e}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row[0]}>
                  {row.map((column) =>
                    column[0] === true ? (
                      <TableCell key={column[1]} style={{ marginTop: "15px" }}>
                        <CheckCircleIcon
                          onClick={(e) => postMentoree(e, column)}
                          fontSize="large"
                        />
                        <CancelIcon fontSize="large" />
                      </TableCell>
                    ) : (
                      <TableCell key={column[1]} align="left">
                        {column === row[2] ? (
                          <CheckCircleIcon
                            onClick={(e) => dismissNotification(e, column)}
                            fontSize="large"
                          />
                        ) : (
                          <div>{column}</div>
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="content">No tienes nuevas notificaciones</div>
      )}
    </div>
  );
}
