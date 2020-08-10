import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      Du er på den anden side <Link to="/">Gå til forsiden igen</Link>
    </div>
  );
};
