import React from "react";
import { useRouteMatch, Route, Link, Switch } from "react-router-dom";

import "./App.css";

function Product(props) {
  const { items, editItem, deleteItem, findItem, storeAddEditItem } = props;
  const { url } = useRouteMatch();

  return (
    <div>
      <h2>Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/*Add the rows here */}
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={e => {
                    e.preventDefault();
                    alert("Not yet implemted!");
                    // deleteItem(item.id);
                  }}
                >
                  Del
                </button>
              </td>
              <td>
                <Link to={`${url}/${item.id}`}>
                  <button className="btn btn-secondary btn-sm">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Route path="/products/:id">
        <AddEditItem
          items={items}
          findItem={findItem}
          addEditItem={storeAddEditItem}
        />
      </Route> */}
    </div>
  );
}

export default Product;
