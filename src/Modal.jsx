import React from "react";
import { Modal } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Moment from "moment";

export default function MyVerticallyCenteredModal(props) {
  let formattedDate = Moment(props.data.date).format("LL");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PerfectScrollbar
          style={{
            position: "relative",
            maxHeight: "50vmin",
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {props.data.items.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productTitle}</td>
                    <td>{product.quantity}</td>
                    <td>{product.sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="float-right">
            <p>
              Order place on: <b>{formattedDate}</b> ----- Order Number:{" "}
              <b>{props.data.id}</b> ----- Total Spend:{" "}
              <b>{props.data.totalAmount}</b>
            </p>
          </div>
        </PerfectScrollbar>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={props.onHide}
          className="btn btn-fill-out btn-sm"
          style={{ color: "#fff" }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
